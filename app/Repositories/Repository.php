<?php

namespace App\Repositories;

class Repository
{
    use Conditions\Conditions;

    protected $model;

    public function model()
    {
        return $this->model;
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(array $data, $id)
    {
        return $this->toSave($this->model->find($id), $data);
    }

    public function updateBy(array $data, $id, $key = 'id')
    {
        return $this->toSave($this->model->where($key, $id)->first(), $data);
    }

    public function delete($id)
    {
        return $this->model->destroy($id);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function all($columns = ["*"])
    {
        return $this->model;
    }

    public function list(
        $query = [],
        $perPage = 10,
        $paginate = true,
        $first = false,
        $get = false,
        $columns = ['*'],
        $limit = null,
        array $orderBy = []
    ) {
        $builder = $this->model->newQuery();
        if ($columns[0] != '*') {
            $builder->select($columns);
        }

        $builder = $this->conditions($builder, $query);

        if ($orderBy) {
            $builder->orderBy($orderBy[0], $orderBy[1]);
        }

        if (!$paginate && $limit) {
            $builder->limit($limit);
        }

        if ($paginate && !$first) {
            return $builder->paginate($perPage);
        } elseif ($first) {
            return $builder->first();
        }

        if ($get) {
            return $builder->get();
        }

        return $builder;
    }

    protected function toSave($model, $data)
    {
        foreach ($data as $key => $value) {
            $model->$key = $value;
        }

        return $model->save();
    }
}