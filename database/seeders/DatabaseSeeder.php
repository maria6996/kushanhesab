<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $array = ['آموزش','محصولات','خدمات','سوالات متداول'];
        foreach ($array as $item){
            \App\Models\CategoryType::create([
                'title' => $item,
            ]);
        }

    }
}
