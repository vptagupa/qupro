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
        Schema::create('qus', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('student_no')->nullable();
            $table->string('student_name')->nullable();
            $table->foreignId('teller_id')->nullable()->constrained('users');
            $table->foreignId('account_type_id')->nullable()->constrained('account_types');
            $table->string('num_fulltext');
            $table->boolean('priority')->default(false);
            $table->datetime('skipped_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qus');
    }
};
