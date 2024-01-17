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
                "name" => "College of Business Administration and Accountancy",
                'description' => '',
            ],
            [
                "name" => "College of Arts and Sciences",
                'description' => '',
            ],
            [
                "name" => "College of Criminology",
                'description' => '',
            ],
            [
                "name" => "College of Education",
                'description' => '',
            ],
            [
                "name" => "College of Hospitality and Tourism",
                'description' => '',
            ],
            [
                "name" => "College of Informatics",
                'description' => '',
            ],
            [
                "name" => "Graduates Studies",
                'description' => '',
            ],
            [
                "name" => "Senior High School",
                'description' => '',
            ],
            [
                "name" => "Extension Program",
                'description' => '',
            ],
            [
                "name" => "Intermediate",
                'description' => '',
            ],
            [
                "name" => "Secondary",
                'description' => '',
            ],
            [
                "name" => "LAW-Juris Doctor",
                'description' => '',
            ],
            [
                "name" => "College of Law",
                'description' => '',
            ],
            [
                "name" => "Basic Education",
                'description' => '',
            ],
            [
                "name" => "Kiddie Kollege",
                'description' => '',
            ],
            [
                "name" => "College of Nursing and Health Sciences",
                'description' => '',
            ],
            [
                "name" => "Institute of Philosophy and Religious Studies",
                'description' => '',
            ],
            [
                "name" => "Transnational Education and Extension Program",
                'description' => '',
            ],
            [
                "name" => "Expanded Tertiary Education Equivalency",
                'description' => '',
            ],
            [
                "name" => "Program for Accelerated College Education",
                'description' => '',
            ],
            [
                "name" => "College of Social Work",
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
