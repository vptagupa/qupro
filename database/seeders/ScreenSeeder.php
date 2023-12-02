<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Screen;
use App\Models\AccountType;
use App\Enums\Screen as ScreenEnum;

class ScreenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Basic',
                'screen' => ScreenEnum::BASIC->value,
                'account_type_ids' => json_encode(AccountType::pluck('id')->toArray()),
            ],
            [
                'name' => 'Standard',
                'screen' => ScreenEnum::STANDARD->value,
                'account_type_ids' => json_encode(AccountType::pluck('id')->toArray()),
            ],
            [
                'name' => 'Premium',
                'screen' => ScreenEnum::PREMIUM->value,
                'account_type_ids' => json_encode(AccountType::pluck('id')->toArray()),
            ],
        ];

        foreach ($data as $row) {
            Screen::updateOrInsert([
                'name' => $row['name']
            ], $row);
        }
    }
}
