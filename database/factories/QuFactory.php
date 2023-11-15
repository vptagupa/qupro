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
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = Type::cases();

        return [
            'type' => $types[rand(0, 1)]->value,
            'name' => fake()->name(),
            'student_no' => substr(fake()->uuid(), 0, 8),
            'student_name' => fake()->name(),
            'teller_id' => User::factory(),
            'account_type_id' => AccountType::find(rand(AccountType::first()->id, AccountType::latest()->first()->id)),
            'num_fulltext' => function ($attributes) {
                return Series::generate(
                    AccountType::find($attributes['account_type_id'])->first(),
                    $attributes['priority']
                );
            },
            'teller_name' => '',
            'priority' => rand(0, 1),
            'skipped_at' => null,
            'completed_at' => null,
            'called_at' => null,
            'is_representative' => fake()->name(),
        ];
    }
}
