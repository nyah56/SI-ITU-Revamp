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
    public function index(Request $request)
    {
        $query = Order::query();
        if ($search = ucfirst($request->input('search'))) {
            $q = Consumer::where('consumer_name', 'like', "%$search%")->pluck('id');

            if ($q->empty()) {
                $query->whereIn('consumer_id', $q);
            } else {
                $query->whereRaw('0=1');
            }
        }
        $per_page = $request->input('per_page', 10);
        $orders   = OrderResource::collection($query->with('consumer')->orderBy('id', 'asc')->paginate($per_page)->withQueryString());

        $consumers = ConsumerResource::collection(Consumer::select('id', 'consumer_name')->get());

        return Inertia::render('order/index', compact('orders', 'consumers'));
    }

    public function store(Request $request)
    {

        $id = Consumer::whereSqid($request->consumer_name)->value('id');
        // dd($request->all());
        Order::create(['consumer_id' => $id, 'status' => $request->status]);
        return to_route('order.index');
    }
    public function show($id)
    {
        return OrderResource::make(Order::findBySqid($id));
    }
    public function update(Request $request, $id)
    {
        // dd($request->all());
        $order = Order::findBySqid($id);
        $id    = Consumer::whereSqid($request->consumer_name)->value('id');
        // dd($id);
        $order->update(['consumer_id' => $id, 'status' => $request->status]);
        return to_route('order.index');
    }
    public function destroy($id)
    {
        Order::findBySqid($id)->delete();
    }
}
