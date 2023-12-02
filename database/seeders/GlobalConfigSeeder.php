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
                'value' => 'THE WORLD IS AN AMAZING PLACE TO LIVE!',
                'type' => 'textarea'
            ],
            [
                "name" => "Screen Interval",
                'value' => 2,
                'type' => 'number',
                'label' => 'In seconds'

            ],
            [
                "name" => "Enable priority on Qu registration",
                'value' => true,
                'type' => 'boolean',
                'label' => 'If enabled, the Qu\'s are required to select either regular or priority upon registration'
            ],
            [
                "name" => "Default Screen Theme",
                'value' => "",
            ],
            [
                "name" => "Screen Tickets Limit",
                'value' => 5,
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
