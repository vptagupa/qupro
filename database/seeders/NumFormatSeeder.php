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
                'affix' => 'cashier',
                'delimiter' => '-',
                "format" => "{affix}{delimiter}{series}",
                'active' => true,
            ],
            [
                "title" => "Registrar Series",
                'affix' => 'registrar',
                'delimiter' => '-',
                "format" => "{affix}{delimiter}{series}",
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
