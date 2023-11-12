<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\NumFormat>
 */
class NumFormatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => 'Format',
            'affix' => 'ALL',
            'delimiter' => '-',
            'format' => '{affix}{delimiter}{(n)series}',
            'active' => 1,
        ];
    }
}
