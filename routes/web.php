<?php

use App\Http\Controllers\ConsumerController;
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
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
