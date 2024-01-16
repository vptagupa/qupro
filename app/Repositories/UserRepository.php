<?php

namespace App\Repositories;

use App\Models\AccountType;
use App\Models\User;

class UserRepository extends Repository
{
    use Conditions\User;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function create(array $data)
    {
        if (!isset($data['password'])) {
            $data['password'] = bcrypt(config('auth.default_password'));
        }

        parent::create($data);
    }

    /**
     * Update teller serving accounts
     * If category id is empty, then all of the categories of the account type will be assigned by default
     * If category is not empty, then it will be remove/insert from the assignments
     */
    public function updateServe(int $userId, AccountType $accountType, ?array $categories = [])
    {
        $user = $this->model->find($userId);

        if (!$categories || count($categories) <= 0) {
            if ($user->accountTypes->filter(fn($d) => $d->id == $accountType->id)->count() > 0) {
                $user->accountTypes()->detach($accountType->id);
            } else {
                foreach ($accountType->categories as $category) {
                    $user->accountTypes()->attach($accountType->id, [
                        'category_id' => $category->id
                    ]);
                }
            }
        } else {
            $ucategories = $user->categories()->wherePivot('account_type_id', $accountType->id)->get();
            // Iterate existing categories and delete it if not active
            $curCategories = $ucategories->filter(fn($cat) => count(array_filter($categories, fn($c) => $c['id'] === $cat->id)) > 0);
            foreach ($curCategories as $category) {
                $find = array_values(array_filter($categories, fn($c) => $c['id'] === $category->id))[0];
                if (!$find['active']) {
                    $user->categories()->detach($category->id);
                }
            }

            // Iterate non-existing categories and add it if active
            $categories = array_filter($categories, function ($category) use ($ucategories) {
                return $ucategories->filter(fn($cat) => $cat->id == $category['id'])->count() <= 0;
            });
            foreach ($categories as $category) {
                if ($category['active']) {
                    $user->categories()->attach($category['id'], [
                        'account_type_id' => $accountType->id
                    ]);
                }
            }

        }
    }
}