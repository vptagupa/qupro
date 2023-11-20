<?php

namespace Database\Factories;

use App\Models\AccountType;
use App\Models\NumFormat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SharedSeries>
 */
class SharedSeriesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_type_ids' => AccountType::factory()->count(3)->create()->pluck('id')->toArray(),
            'num_format_id' => NumFormat::factory(),
            'num_start' => 1,
            'priority' => 0
        ];
    }
}
