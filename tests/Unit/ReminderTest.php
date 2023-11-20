<?php

namespace Tests\Unit;

use App\Repositories\QuRepository;
use Tests\TestCase;
use App\Models\Qu;
use App\Models\AccountType;
use App\Models\SharedSeries;
use App\Services\Qu as QuService;
use Illuminate\Support\Facades\App;
use Illuminate\Foundation\Testing\DatabaseTruncation;

class ReminderTest extends TestCase
{
    use DatabaseTruncation;

    protected $qus;
    protected $accountType;
    protected $repository;

    /**
     * A test for getting the reminders are equal
     */
    public function test_for_getting_reminders_are_equal(): void
    {
        Qu::factory()->count(50)->create([
            'priority' => false,
            'account_type_id' => $this->accountType->id
        ]);

        $reminders = $this->repository->getForReminders(
            accountType: $this->accountType,
            priority: false,
            start: 5,
            block: 5
        );

        $this->assertEquals([5, 6, 7, 8, 9], $reminders->pluck('id')->toArray());
    }

    /**
     * A test for reminnder if notified
     */
    public function test_for_reminders_if_notified(): void
    {
        Qu::factory()->resetCounter();

        $qu = Qu::factory()->count(50)->create([
            'priority' => false,
            'account_type_id' => $this->accountType->id
        ]);

        $this->seed(\Database\Seeders\GlobalConfigSeeder::class);

        // Start at Id 1
        // Notified, 6 to 10
        QuService::reminder($qu->first()->id);

        // Get the next reminders
        $reminders = $this->repository->getForReminders(
            accountType: $this->accountType,
            priority: false,
            start: 6,
            block: 5
        );

        // Test reminders are not yet notified
        // #6 is skip since it was previoulsy notified
        $this->assertEquals([], $reminders->pluck('id')->toArray());
    }

    /**
     * A test for reminnder if yet notified
     */
    public function test_for_reminders_if_yet_notified(): void
    {
        Qu::factory()->resetCounter();

        $qu = Qu::factory()->count(50)->create([
            'priority' => false,
            'account_type_id' => $this->accountType->id
        ]);

        $this->seed(\Database\Seeders\GlobalConfigSeeder::class);

        // Start at Id 1
        // Notified, 6 to 10
        QuService::reminder($qu->first()->id);

        // Get the next reminders
        $reminders = $this->repository->getForReminders(
            accountType: $this->accountType,
            priority: false,
            start: 7,
            block: 5
        );

        // Test reminders are not yet notified
        // 7 to 10 is skip since it was previoulsy notified
        $this->assertEquals([11], $reminders->pluck('id')->toArray());
    }

    /**
     * A test for reminder with shared Qu and yet notified
     */
    public function test_for_reminders_shared_if_yet_notified(): void
    {
        Qu::factory()->resetCounter();

        $shared = SharedSeries::factory()->create([
            'priority' => 0
        ]);

        // Create shared Qu
        $accountType = AccountType::find($shared->account_type_ids[0]);
        $sharedQu = Qu::factory()->for($accountType)->count(12)->create([
            'priority' => false
        ]);

        // Create None shared Q
        $qu = Qu::factory()->count(50)->create([
            'priority' => false,
            'account_type_id' => $this->accountType->id
        ]);

        $this->seed(\Database\Seeders\GlobalConfigSeeder::class);

        // Start at Id 1
        // Notified, 6 to 10
        QuService::reminder($sharedQu->first()->id);

        // Get the next reminders
        $reminders = $this->repository->getForReminders(
            accountType: $accountType,
            priority: false,
            start: 9,
            block: 5
        );

        // Test reminders are not yet notified
        // 7 to 10 is skip since it was previoulsy notified
        $this->assertEquals([11, 12], $reminders->pluck('id')->toArray());
    }

    public function setup(): void
    {
        parent::setUp();

        $this->accountType = AccountType::factory()->create();

        $this->repository = App::make(QuRepository::class);
    }
}
