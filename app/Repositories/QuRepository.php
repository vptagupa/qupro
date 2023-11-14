<?php

namespace App\Repositories;

use App\Models\Qu;

class QuRepository extends Repository
{
    public function __construct(Qu $model)
    {
        $this->model = $model;
    }

    public function list($query = [], $perPage = 10)
    {
        return $this->model->when(isset($query['name']) && $query['name'], function ($builder) use ($query) {
            $builder->where('name', 'like', '%' . $query['name'] . '%');
        })
            ->when(isset($query['student_no']) && $query['student_no'], function ($builder) use ($query) {
                $builder->where('student_no', 'like', '%' . $query['student_no'] . '%');
            })
            ->when(isset($query['student_name']) && $query['student_name'], function ($builder) use ($query) {
                $builder->where('student_name', 'like', '%' . $query['student_name'] . '%');
            })
            ->when(isset($query['called']) && $query['called'], function ($builder) use ($query) {
                $builder->whereNotNull('called_at');
            })
            ->when(isset($query['completed']) && $query['completed'], function ($builder) use ($query) {
                $builder->whereNotNull('called_at');
            })
            ->when(isset($query['accountType']) && $query['accountType'], function ($builder) use ($query) {
                $builder->with('accountType');
            })
            ->when(isset($query['account_type_id']) && $query['account_type_id'], function ($builder) use ($query) {
                $builder->whereAccountTypeId($query['account_type_id']);
            })->paginate($perPage);
    }

    public function getNext(int $accountTypeId, bool $priority = false): ?Qu
    {
        return $this->getWaiting($accountTypeId, $priority)->first();
    }

    public function getWaiting(int $accountTypeId, $priority = null, int $limit = 5)
    {
        return $this->model->with(['accountType', 'accountType.waiting'])
            ->when(!is_null($priority), function ($builder) use ($priority) {
                $builder->wherePriority($priority);
            })
            ->whereNull('called_at')
            ->where('account_type_id', $accountTypeId)
            ->orderBy('id', 'asc')
            ->paginate($limit);
    }

    public function find($id)
    {
        return $this->model->with(['accountType', 'accountType.waiting'])->find($id);
    }
}