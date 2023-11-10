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
                "name" => "Reminder Threshold",
                'value' => '5',
            ],
            [
                "name" => "Reminder Block",
                'value' => '5',
            ],
            [
                "name" => "Num Start",
                'value' => '1',
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
