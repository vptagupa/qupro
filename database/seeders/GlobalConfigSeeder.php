<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Config;

class GlobalConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $real = [
            [
                "name" => "Reminder threshold",
                'value' => '5',
                'type' => 'number'
            ],
            [
                "name" => "Reminder block",
                'value' => '5',
                'type' => 'number'
            ],
            [
                "name" => "Num start",
                'value' => '1',
                'type' => 'number'
            ],
            [
                "name" => "Priority series separate",
                'value' => true,
                'type' => 'boolean',
                'label' => 'If enabled, priority series does not continue from the regular series'
            ],
            [
                "name" => "Screen Text",
                'value' => 'Hellow World!',
                'type' => 'textarea'
            ],
            [
                "name" => "Screen Interval",
                'value' => 2,
                'type' => 'number',
                'label' => 'In seconds'

            ],

        ];

        foreach ($real as $row) {
            Config::updateOrInsert(
                [
                    "name" => $row["name"],
                ],
                $row,
            );
        }
    }
}
