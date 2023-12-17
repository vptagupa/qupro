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
    public function updateServe(int $userId, AccountType $accountType, ?int $categoryId = null)
    {
        $user = $this->model->find($userId);

        if (!$categoryId) {
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
            $categories = $user->categories()->wherePivot('account_type_id', $accountType->id);
            $categories->toggle([$categoryId => [
                'account_type_id' => $accountType->id
            ]]);
        }
    }
}