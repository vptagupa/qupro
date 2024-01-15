<?php

namespace Database\Seeders;

use App\Models\Category;
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
                "name" => "Deparmtment A",
                'num_start' => 1,
                "num_format_id" => NumFormat::whereTitle('All')->first()->id,
                "priority_format_id" => NumFormat::whereTitle('Priority')->first()->id,
            ],
            [
                "name" => "Deparmtment B",
                'num_start' => 1,
                "num_format_id" => NumFormat::whereTitle('All')->first()->id,
                "priority_format_id" => NumFormat::whereTitle('Priority')->first()->id,
            ],
            [
                "name" => "Deparmtment C",
                'num_start' => 1,
                "num_format_id" => NumFormat::whereTitle('All')->first()->id,
                "priority_format_id" => NumFormat::whereTitle('Priority')->first()->id,
            ],
            [
                "name" => "Deparmtment D",
                'num_start' => 1,
                "num_format_id" => NumFormat::whereTitle('All')->first()->id,
                "priority_format_id" => NumFormat::whereTitle('Priority')->first()->id,
            ],
            [
                "name" => "Deparmtment E",
                'num_start' => 1,
                "num_format_id" => NumFormat::whereTitle('All')->first()->id,
                "priority_format_id" => NumFormat::whereTitle('Priority')->first()->id,
            ],
            [
                "name" => "Deparmtment F",
                'num_start' => 1,
                "num_format_id" => NumFormat::whereTitle('All')->first()->id,
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
            $model = AccountType::where([
                "name" => $row["name"],
            ])->first();

            $model->categories()->sync(Category::pluck('id'));
        }
    }
}
