<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Qu;
use App\Models\AccountType;

class FakeQuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (AccountType::get() as $type) {
            Qu::factory()->count(50)->create([
                'account_type_id' => $type->id,
            ]);
        }
    }
}
