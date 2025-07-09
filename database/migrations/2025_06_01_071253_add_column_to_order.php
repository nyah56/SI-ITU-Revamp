<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('order', function (Blueprint $table) {
            //
            $table->enum('status', ['pending', 'processing', 'completed', 'cancelled'])->default('pending')->after('consumer_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('order', 'status')) {
            Schema::table('order', function (Blueprint $table) {
                $table->dropColumn('status');
            });
        }
    }
};
