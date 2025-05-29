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
        //
        Schema::table('farmer', function (Blueprint $table) {
            $table->text('farmer_name')->after('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        if (Schema::hasColumn('farmer', 'farmer_name')) {
            Schema::table('farmer', function (Blueprint $table) {
                $table->dropColumn('farmer_name');
            });
        }
    }
};
