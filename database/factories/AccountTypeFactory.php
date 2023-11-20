<?php

namespace Database\Factories;

use App\Models\NumFormat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AccountType>
 */
class AccountTypeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'num_format_id' => NumFormat::factory(),
            'priority_format_id' => NumFormat::factory(),
            'num_start' => 1,
        ];
    }
}
