<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Factories\Sequence;
use App\Models\Qu;
use App\Models\Category;
use App\Models\AccountType;
use App\Services\Series;

class FakeQuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (AccountType::get() as $type) {
            foreach (Category::get() as $category) {
                Qu::factory()->count(ceil(50 / $category->count()))
                    ->state(
                        new Sequence(
                            function (Sequence $sequence) use ($type) {
                                $series = Series::generate($type);
                                return [
                                    'num_fulltext' => $series->num_fulltext,
                                    'num' => $series->num,
                                ];
                            }
                        )
                    )
                    ->create([
                        'account_type_id' => $type->id,
                        'category_id' => $category->id,
                    ]);
            }
        }
    }
}
