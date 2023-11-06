<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \App\Models\User;
use \App\Models\File;

class FakeUserSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->count(50)
            ->create([
                "role" => \App\Enums\Role::ADMIN,
            ]);

        $user = User::factory()->count(50)->create([
            "role" => \App\Enums\Role::TELLER,
        ]);

    }
}
