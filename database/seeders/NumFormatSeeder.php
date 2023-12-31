<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\NumFormat;

class NumFormatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $real = [
            [
                "title" => "All",
                'affix' => '',
                'delimiter' => '-',
                "format" => "{(5)series}",
                'active' => true,
            ],
            [
                "title" => "Cashier Series",
                'affix' => 'cash',
                'delimiter' => '-',
                "format" => "{affix}{delimiter}{series}",
                'active' => true,
            ],
            [
                "title" => "Registrar Series",
                'affix' => 'reg',
                'delimiter' => '-',
                "format" => "{affix}{delimiter}{series}",
                'active' => true,
            ],
            [
                "title" => "Accounting Series",
                'affix' => 'acc',
                'delimiter' => '-',
                "format" => "{affix}{delimiter}{series}",
                'active' => true,
            ],
            [
                "title" => "Assessment Series",
                'affix' => 'ass',
                'delimiter' => '-',
                "format" => "{affix}{delimiter}{series}",
                'active' => true,
            ],
            [
                "title" => "Priority",
                'affix' => 'P',
                'delimiter' => '-',
                "format" => "{affix}{delimiter}{(5)series}",
                'active' => true,
            ]
        ];

        foreach ($real as $row) {
            NumFormat::updateOrInsert(
                [
                    "title" => $row["title"],
                ],
                $row,
            );
        }
    }
}
