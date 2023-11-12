<?php

namespace App\Repositories;

use App\Models\Qu;
use App\Models\Series;
use App\Models\Config;
use App\Models\AccountType;

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
            })->paginate($perPage);
    }

    public function create(array $data)
    {
        $type = AccountType::findOrFail($data['account_type_id']);
        $series = Series::when(!$type->is_shared_series, function ($builder) use ($type) {
            $builder->where([
                'account_type_id' => $type->id,
            ]);
        })->when($type->is_shared_series, function ($builder) use ($type) {
            $builder->where('shared_series_id', $type->shared_series->id);
        })->latest()->first();

        // Use default num
        $num = $type->getNumStart();
        // Increase series if exists
        if ($series?->num) {
            $num = $series->num + 1;
        }
        // use global config instead
        if (!$num) {
            $num = Config::numstart() ?? 1;
        }

        if (!$series) {
            $series = new Series();
            $series->account_type_id = $type->is_shared_series ? null : $type->id;
            $series->shared_series_id = $type->shared_series?->id;
        }

        $series->num = $num;
        $series->num_fulltext = $type->getQuFullText($num);
        $series->save();

        $data['num_fulltext'] = $series->num_fulltext;

        return parent::create($data);
    }
}