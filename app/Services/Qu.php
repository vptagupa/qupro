<?php

namespace App\Services;


use App\Repositories\QuRepository;
use Illuminate\Support\Facades\App;
use App\Models\Qu as Model;
use Carbon\Carbon;

class Qu
{
    private $accountType;

    public function __construct(private QuRepository $repository)
    {

    }

    public static function next(int $accountTypeId, bool $priority = false): ?Model
    {
        $service = new self(
            App::make(QuRepository::class)
        );

        return $service->then($accountTypeId, $priority);
    }

    public function then(int $accountTypeId, bool $priority = false): ?Model
    {
        $next = function ($accountTypeId, $priority) {
            return $this->repository->getNext($accountTypeId, $priority);
        };

        $qu = $next($accountTypeId, $priority);
        if ($qu) {
            $qu->called_at = Carbon::now();
            $qu->save();
        }

        if ($qu) {
            return $this->repository->find($qu->id);
        }

        return null;
    }
}