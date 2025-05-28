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
        Schema::create('consumer', function (Blueprint $table) {
            $table->id();
            $table->text('consumer_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->text('address');
            $table->timestamps();
        });
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->text('product_name');
            $table->timestamps();
        });
        Schema::create('farmer', function (Blueprint $table) {
            $table->id();
            $table->string('phone');
            $table->string('email')->nullable();
            $table->text('address');
            $table->timestamps();
        });
        Schema::create('order', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('consumer_id');
            $table->timestamps();
            $table->foreign('consumer_id')->references('id')->on('consumer')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('product');
        Schema::dropIfExists('farmer');
        Schema::dropIfExists('order');
        Schema::dropIfExists('consumer');
    }
};
