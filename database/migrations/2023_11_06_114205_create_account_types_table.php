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
        Schema::create('account_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('num_format_id')->constrained('num_formats');
            $table->foreignId('priority_format_id')->nullable()->constrained('num_formats');
            $table->unsignedInteger('num_start')->nullable();
            $table->foreignId('file_id')->nullable()->constrained('files');
            $table->datetime('reset_at')->nullable();
            $table->foreignId('reset_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_types');
    }
};
