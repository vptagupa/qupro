<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $realUsers = [
            [
                "name" => "Vic",
                'nickname' => 'Vic',
                "email" => "victortagupa@gmail.com",
                "password" => bcrypt("secret"),
            ]
        ];

        foreach ($realUsers as $user) {
            User::updateOrInsert(
                [
                    "email" => $user["email"],
                ],
                $user,
            );
        }
    }
}
