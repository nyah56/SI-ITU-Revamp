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
        Schema::create('stock', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('farmer_id');
            $table->date('expiration_date')->nullable();
            $table->integer('quantity');
            $table->timestamps();
            $table->foreign('product_id')->references('id')->on('product')->onDelete('cascade');
            $table->foreign('farmer_id')->references('id')->on('farmer')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('stock');
    }
};
