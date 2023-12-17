<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Qu;
use App\Models\Category;
use App\Models\AccountType;

class FakeQuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (AccountType::get() as $type) {
            foreach (Category::get() as $category) {
                Qu::factory()->count(ceil(50 / $category->count()))->create([
                    'account_type_id' => $type->id,
                    'category_id' => $category->id
                ]);
            }

        }
    }
}
