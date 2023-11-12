<?php

namespace App\Http\Controllers\Shared;

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Http\Resources\QuCollection;
use App\Http\Requests\StoreQuRequest;
use App\Http\Requests\UpdateQuRequest;
use App\Repositories\QuRepository;

class BasedQuController extends AdminController
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(private QuRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/qu/index');
    }

    /**
     * Display a listing of the resource.
     */
    public function outsideAdmin()
    {
        return $this->render(
            view: 'qu/public',
            layout: 'app-qu'
        );
    }



    /**
     * Get student info
     * @return array as reponse
     */
    public function getStudentInfo()
    {
        return [
            'student_no' => '0001',
            'name' => 'Victor P. Tagupa Jr',
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
        $safe = $request->safe()->merge([
            'account_type_id' => $request->get('account_type')['id'],
            'student_no' => $request->get('student_info')['student_no'],
            'student_name' => $request->get('student_info')['name'],
        ]);

        return $this->repository->create($safe->only([
            'type',
            'account_type_id',
            'name',
            'student_no',
            'student_name',
            'is_representative'
        ]));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateQuRequest $request, int $id)
    {
        $safe = $request->safe()->merge([
            'account_type_id' => $request->get('account_type'),
        ]);

        return $this->repository->update($safe->only([
            'type',
            'account_type_id',
            'name',
            'student_no',
            'student_name',
            'is_representative'
        ]), $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->repository->delete($id);
    }
}
