<?php

use App\Http\Controllers\ConsumerController;
use App\Http\Controllers\FarmerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/product', [ProductController::class, 'index'])->name('product.index');
    Route::post('/product', [ProductController::class, 'store'])->name('product.store');
    Route::get('/product/{id}', [ProductController::class, 'show'])->name('product.show');
    Route::patch('/product/{id}', [ProductController::class, 'update'])->name('product.update');
    Route::delete('/product/{id}', [ProductController::class, 'destroy'])->name('product.destroy');

    Route::get('/consumer', [ConsumerController::class, 'index'])->name('consumer.index');
    Route::post('/consumer', [ConsumerController::class, 'store'])->name('consumer.store');
    Route::get('/consumer/{id}', [ConsumerController::class, 'show'])->name('consumer.show');
    Route::patch('/consumer/{id}', [ConsumerController::class, 'update'])->name('consumer.update');
    Route::delete('/consumer/{id}', [ConsumerController::class, 'destroy'])->name('consumer.destroy');

    Route::get('/farmer', [FarmerController::class, 'index'])->name('farmer.index');
    Route::post('/farmer', [FarmerController::class, 'store'])->name('farmer.store');
    Route::get('/farmer/{id}', [FarmerController::class, 'show'])->name('farmer.show');
    Route::patch('/farmer/{id}', [FarmerController::class, 'update'])->name('farmer.update');
    Route::delete('/farmer/{id}', [FarmerController::class, 'destroy'])->name('farmer.destroy');

    Route::get('/order', [OrderController::class, 'index'])->name('order.index');
    Route::post('/order', [OrderController::class, 'store'])->name('order.store');
    Route::get('/order/{id}', [OrderController::class, 'show'])->name('order.show');
    Route::patch('/order/{id}', [OrderController::class, 'update'])->name('order.update');
    Route::delete('/order/{id}', [OrderController::class, 'destroy'])->name('order.destroy');
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
