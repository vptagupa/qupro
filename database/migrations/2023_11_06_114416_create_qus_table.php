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
            $table->string('type', 15);
            $table->string('name')->nullable();
            $table->string('student_no')->nullable();
            $table->string('student_name')->nullable();
            $table->foreignId('teller_id')->nullable()->constrained('users');
            $table->foreignId('account_type_id')->nullable()->constrained('account_types');
            $table->foreignId('category_id')->nullable()->constrained('categories');
            $table->string('num_fulltext')->nullable();
            $table->unsignedInteger('num')->nullable();
            $table->string('counter_name')->nullable();
            $table->boolean('active')->default(false)->nullable();
            $table->boolean('priority')->default(false);
            $table->boolean('is_representative')->default(false);
            $table->boolean('is_advance')->default(false);
            $table->datetime('skipped_at')->nullable();
            $table->datetime('called_at')->nullable();
            $table->datetime('completed_at')->nullable();
            $table->datetime('notified_at')->nullable();
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
