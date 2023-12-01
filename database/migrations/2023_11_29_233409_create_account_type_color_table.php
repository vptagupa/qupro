<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('account_type_color', function (Blueprint $table) {
            $table->foreignId('account_type_id')->constrained('account_types');
            $table->string('counter_bg_color')->nullable();
            $table->string('counter_font_color')->nullable();
            $table->json('counter_grid_color')->nullable();
            $table->json('active_counter_grid_color')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_type_color');
    }
};
