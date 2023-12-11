<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $real = [
            [
                "name" => "College",
                'description' => '',
            ],
            [
                "name" => "Senior High School",
                'description' => '',
            ],
            [
                "name" => "Grade School",
                'description' => '',
            ],
        ];

        foreach ($real as $row) {
            Category::updateOrInsert(
                [
                    "name" => $row["name"],
                ],
                $row,
            );
        }
    }
}
