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
        Schema::create('num_formats', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('format');
            $table->string('affix', 10)->nullable();
            $table->string('delimiter', 5)->nullable();
            $table->boolean('active')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('num_formats');
    }
};
