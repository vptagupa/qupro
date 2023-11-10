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
        Schema::create('shared_series', function (Blueprint $table) {
            $table->id();
            $table->json('account_type_ids');
            $table->foreignId('num_format_id')->constrained('num_formats')->cascadeOnDelete();
            $table->unsignedInteger('num_start');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shared_qu_numbers');
    }
};
