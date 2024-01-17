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
                'label' => 'If enabled, priority series does not continue from the regular series.'
            ],
            [
                "name" => "Screen Text",
                'value' => 'THE WORLD IS AN AMAZING PLACE TO LIVE!',
                'type' => 'textarea'
            ],
            [
                "name" => "Screen Interval",
                'value' => 5,
                'type' => 'number',
                'label' => 'In seconds'

            ],
            [
                "name" => "Enable priority on Qu registration",
                'value' => true,
                'type' => 'boolean',
                'label' => 'If enabled, the Qu\'s are required to select either regular or priority upon registration.'
            ],
            [
                "name" => "Default Screen Theme",
                'value' => "",
            ],
            [
                "name" => "Screen Tickets Limit",
                'label' => 'Limit number of tickets in the screen.',
                'value' => 5,
            ],
            [
                "name" => "Counter History Limit",
                'label' => 'Limit number of tickets per counter in the screen.',
                'value' => 5,
            ],
            [
                "name" => "Category Limit",
                'value' => 10,
            ],
            [
                "name" => "Enable categories",
                'value' => true,
                'type' => 'boolean',
            ],
            [
                "name" => "Enable category statistics",
                'value' => true,
                'type' => 'boolean',
            ],
            [
                "name" => "On Called Ring",
                'value' => "",
                'acceptable' => json_encode(['mp3']),
                'type' => 'file',
            ],
            [
                "name" => "On Demand Ring",
                'value' => "",
                'acceptable' => json_encode(['mp3']),
                'type' => 'file',
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
