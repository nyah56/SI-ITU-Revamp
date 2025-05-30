<?php
namespace App\Http\Controllers;

use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    //
    public function index()
    {
        $orders = OrderResource::collection(Order::with('consumer')->get());

        return Inertia::render('order/index', compact('orders'));
    }

    public function store(Request $request)
    {
        Order::create($request->all());
        return to_route('farmer.index');
    }
    public function show($id)
    {
        return Order::findBySqid($id);
    }
    public function update(Request $request, $id)
    {
        Order::findBySqid($id)->update($request->all());
        return to_route('farmer.index');
    }
    public function destroy($id)
    {
        Order::findBySqid($id)->delete();
    }
}
