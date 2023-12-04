<?php

namespace App\Services;


use App\Events\StudentReminder;
use App\Repositories\QuRepository;
use Illuminate\Support\Facades\App;
use App\Models\Qu as Model;
use App\Models\User;
use App\Models\Config;
use App\Events\QuCalled;
use Carbon\Carbon;

class Qu
{
    private $accountType;

    public function __construct(private QuRepository $repository)
    {

    }
    public static function recalled(User $user, int $id)
    {
        $service = new self(
            App::make(QuRepository::class)
        );

        return $service->setRecalled($user, $id);
    }

    public static function completed(User $user, int $id)
    {
        $service = new self(
            App::make(QuRepository::class)
        );

        return $service->setCompleted($user, $id);
    }

    public static function reminder(int $id)
    {
        $repository = App::make(QuRepository::class);
        $service = new self($repository);

        return $service->dispatchReminderEvent($repository->find($id));
    }

    public function setRecalled(User $user, int $id)
    {
        $this->repository->update([
            'teller_id' => $user->id,
            'called_at' => Carbon::now(),
            'counter_name' => $user->counter_name,
            'active' => false,
        ], $id);

        $this->dispatchCalledEvent($this->repository->find($id));
    }

    public function setCompleted(User $user, int $id)
    {
        $this->repository->update([
            'teller_id' => $user->id,
            'completed_at' => Carbon::now(),
            'counter_name' => $user->counter_name,
            'active' => false,
        ], $id);
    }

    public static function next(int $accountTypeId, string $counterName, bool $priority = false): ?Model
    {
        $service = new self(
            App::make(QuRepository::class)
        );

        return $service->getNext($accountTypeId, $counterName, $priority);
    }

    public function getNext(int $accountTypeId, string $counterName, bool $priority = false): ?Model
    {
        $next = function ($accountTypeId, $priority) {
            return $this->repository->getNext($accountTypeId, $priority);
        };

        $qu = $next($accountTypeId, $priority);

        if ($qu) {
            $qu->called_at = Carbon::now();
            $qu->counter_name = $counterName;
            $qu->active = true;
            $qu->save();

            $this->dispatchCalledEvent($qu);
            $this->dispatchReminderEvent($qu);
        }

        if ($qu) {
            return $this->repository->find($qu->id);
        }

        return null;
    }

    public function dispatchCalledEvent($qu)
    {
        QuCalled::dispatch($qu, $qu->getServedTotal());
    }

    public function dispatchReminderEvent($qu)
    {
        StudentReminder::dispatch(
            $this->repository->getForReminders(
                $qu->accountType,
                $qu->num + Config::reminderThreshold(),
                Config::reminderBlock(),
            )
        );
    }
}