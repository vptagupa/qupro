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
            ],
            [
                "name" => "Reminder block",
                'value' => '5',
            ],
            [
                "name" => "Num start",
                'value' => '1',
            ],
            [
                "name" => "Priority series separate",
                'value' => true,
            ],
            [
                "name" => "Screen Text",
                'value' => '',
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
