<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AccountType;
use App\Models\NumFormat;

class AccountTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $real = [
            [
                "name" => "Registrar",
                'num_start' => 1,
                "num_format_id" => NumFormat::whereTitle('Registrar Series')->first()->id,
                "priority_format_id" => NumFormat::whereTitle('Priority')->first()->id,
            ],
            [
                "name" => "Cashier",
                'num_start' => 1,
                "num_format_id" => NumFormat::whereTitle('Cashier Series')->first()->id,
                "priority_format_id" => NumFormat::whereTitle('Priority')->first()->id,
            ],
            [
                "name" => "Accounting",
                'num_start' => 1,
                "num_format_id" => NumFormat::whereTitle('Accounting Series')->first()->id,
                "priority_format_id" => NumFormat::whereTitle('Priority')->first()->id,
            ],
            [
                "name" => "Assessment",
                'num_start' => 1,
                "num_format_id" => NumFormat::whereTitle('Assessment Series')->first()->id,
                "priority_format_id" => NumFormat::whereTitle('Priority')->first()->id,
            ],
        ];

        foreach ($real as $row) {
            AccountType::updateOrInsert(
                [
                    "name" => $row["name"],
                ],
                $row,
            );
        }
    }
}
