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
        Schema::create('schedule', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->date('shipment_date');
            $table->timestamps();
            $table->foreign('order_id')->on('order')->references('id')->onDelete('cascade');
        });
        Schema::create('order_detail', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('product_id');
            $table->integer('quantity');
            $table->timestamps();
            $table->foreign('order_id')->on('order')->references('id')->onDelete('cascade');
            $table->foreign('product_id')->on('product')->references('id')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('schedule');
        Schema::dropIfExists('order_detail');
    }
};
