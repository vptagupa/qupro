<?php

namespace App\Repositories;

class Repository
{
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
        return $this->model->where('id', $id)->update($data);
    }

    public function updateBy(array $data, $id, $key = 'id')
    {
        $this->model->where($key, $id)->update($data);
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

    public function conditions($builder, $query)
    {
        $keys = array_keys($query);

        foreach ($keys as $key) {
            if (preg_match('/(\w+|\W+|\w+)*\(\d\)/', $key, $matches)) {
                $key = preg_replace('/\(\d\)/', '', $matches[0]);
                preg_match('/\d/', $matches[0], $limit);

                $query[$key]['limit'] = $limit[0];
            }

            $key = str_replace('.', 'With_', $key);
            $condition = str($key)->camel() . 'Condition';

            $builder = $this->$condition($builder, $query);
        }

        return $builder;
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

    public function idCondition(&$builder, $query)
    {
        return $builder->when(isset($query['id']) && $query['id'], function ($builder) use ($query) {
            $builder->whereId($query['id']);
        });
    }

    public function nameCondition(&$builder, $query)
    {
        return $builder->when(isset($query['name']) && $query['name'], function ($builder) use ($query) {
            $builder->where('name', 'like', '%' . $query['name'] . '%');
        });
    }
}