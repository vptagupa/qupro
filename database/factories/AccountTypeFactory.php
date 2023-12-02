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
        $format = NumFormat::whereTitle('format')->first();
        $format = $format ? $format : NumFormat::factory();

        return [
            'name' => fake()->name(),
            'num_format_id' => $format,
            'priority_format_id' => $format,
            'num_start' => 1,
        ];
    }
}
