<?php

namespace App\Http\Controllers\Shared;

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Http\Resources\QuCollection;
use App\Http\Requests\StoreQuRequest;
use App\Repositories\QuRepository;
use App\Repositories\AccountTypeRepository;
use App\Services\Series;

class BasedQuController extends AdminController
{
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
    public function getStudentInfo()
    {
        return [
            'student_no' => '0001',
            'name' => 'John Smith',
            'course_code' => 'BSIT',
            'course' => 'Bachelor of Science in Information Technology'
        ];
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
}
