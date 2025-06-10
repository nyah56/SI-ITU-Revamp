<?php
namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $query = Product::query();
        if ($search = ucfirst($request->input('search'))) {
            $query->where('product_name', 'like', "%{$search}%");
        }
        $per_page = $request->input('per_page', 10);
        $products = ProductResource::collection($query->orderBy('product_name', 'asc')->paginate($per_page)->withQueryString());
        return Inertia::render('product/index', compact('products'));
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
        return Product::findBySqid($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $product     = Product::findBySqid($id);
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
        Product::findBySqid($id)->delete();
        return to_route('product.index');
    }
}
