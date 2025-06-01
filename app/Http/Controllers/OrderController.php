<?php
namespace App\Http\Controllers;

use App\Http\Resources\ConsumerResource;
use App\Http\Resources\OrderResource;
use App\Models\Consumer;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    //
    public function index()
    {
        $orders = OrderResource::collection(Order::with('consumer')->get());

        $consumers = ConsumerResource::collection(Consumer::all());
        return Inertia::render('order/index', compact('orders', 'consumers'));
    }

    public function store(Request $request)
    {

        $id = Consumer::findBySqid($request->consumer_name)->pluck('id')->first();
        // dd($id);
        Order::create(['consumer_id' => $id]);
        return to_route('order.index');
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
