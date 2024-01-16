<?php

namespace App\Http\Controllers\Shared;

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Http\Resources\QuCollection;
use App\Http\Requests\StoreQuRequest;
use App\Http\Requests\NextQuRequest;
use App\Repositories\QuRepository;
use App\Repositories\AccountTypeRepository;
use App\Services\Series;
use App\Services\Qu;
use Illuminate\Support\Facades\Http;
use Cache;
use Carbon\Carbon;

class BasedQuController extends AdminController
{
    protected $infoKey = 'student_portal.';

    /**
     * Display a listing of the resource.
     */
    public function __construct(protected QuRepository $repository, protected AccountTypeRepository $accountTypeRepository)
    {
        // 
    }

    /**
     * Get student info
     * @return array as reponse
     */
    public function getStudentInfo($studentNo)
    {
        if ($info = $this->apiStudentInfo($studentNo)) {
            return [
                'student_no' => $info['student_number'],
                'name' => $info['name'],
                'course_code' => $info['course_code'],
                'course' => $info['course_name'],
            ];
        }

        return [];
    }


    public function list(Request $request)
    {
        return new QuCollection(
            $this->repository->list(
                ['name' => $request->get('format')],
                $request->get('per_page'),
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuRequest $request)
    {
        $series = Series::generate(
            $this->accountTypeRepository->find($request->get('account_type')['id']),
            $request->get('is_priority') ?? false
        );

        $safe = $request->safe()->merge([
            'num_fulltext' => $series->num_fulltext,
            'num' => $series->num,
        ]);

        return $this->repository->create($safe->only([
            'type',
            'account_type_id',
            'category_id',
            'name',
            'student_no',
            'student_name',
            'is_representative',
            'priority',
            'num_fulltext',
            'num'
        ]));
    }

    public function next(NextQuRequest $request)
    {
        if ($request->safe()->qu) {
            Qu::completed($request->user(), $request->safe()->qu);
        }

        return Qu::next(
            $request->user(),
            $request->safe()->account_type_id,
            $request->safe()->priority
        );
    }

    private function apiStudentInfo($id)
    {
        $http = Http::withHeaders([
            'mid' => config('student.mid'),
            'mKey' => config('student.mkey')
        ]);

        return Cache::remember($this->infoKey . $id, Carbon::now()->addMonths(3), function () use ($http, $id) {
            $response = $http->get('https://api.pcu.priisms.online/api/students-api/' . $id);

            if ($response->ok()) {
                $data = $response->json();

                if ($data['message'] != 'Student not found') {
                    return $data['data'];
                }
            }

            return null;
        });
    }
}
