<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $products = Product::all();

        return Inertia::render('product/index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $requestUser = $request->validate(['product_name' => ['required', 'max:255']]);
        Product::create($requestUser);
        return to_route('product.index');
    }

    /**
     * Display the specified resource.
     *
     */
    public function show(string $id)
    {
        //
        // $product =
        return Product::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $product     = Product::find($id);
        $requestUser = $request->validate(['product_name' => ['required', 'max:255']]);
        $product->update($requestUser);
        return to_route('product.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $product = Product::find($id)->delete();
        return to_route('product.index');
    }
}
