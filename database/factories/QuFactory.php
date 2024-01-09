<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\User;
use App\Models\AccountType;
use App\Models\NumFormat;
use App\Services\Series;
use App\Enums\Type;



/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Qu>
 */
class QuFactory extends Factory
{
    static $counter = 0;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = Type::cases();

        self::$counter++;

        return [
            'type' => $types[rand(0, 1)]->value,
            'name' => function ($attributes) {
                if ($attributes['is_representative']) {
                    return fake()->name();
                }
                return null;
            },
            'student_no' => substr(fake()->uuid(), 0, 8),
            'student_name' => fake()->name(),
            'teller_id' => User::first(),
            'account_type_id' => AccountType::factory(),
            'counter_name' => '',
            'priority' => rand(0, 1),
            'skipped_at' => null,
            'completed_at' => null,
            'called_at' => null,
            'is_representative' => rand(0, 1),
        ];
    }

    public function resetCounter()
    {
        self::$counter = 0;
    }
}
