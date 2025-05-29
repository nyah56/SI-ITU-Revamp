<?php
namespace App\Http\Controllers;

use App\Http\Resources\ConsumerResource;
use App\Models\Consumer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsumerController extends Controller
{
    //
    public function index()
    {
        $consumers = ConsumerResource::collection(Consumer::all());

        return Inertia::render('consumer/index', compact('consumers'));
    }

    public function store(Request $request)
    {
        Consumer::create($request->all());
        return to_route('consumer.index');
    }
    public function show($id)
    {
        return Consumer::findBySqid($id);
    }
    public function update(Request $request, $id)
    {
        Consumer::findBySqid($id)->update($request->all());
        return to_route('consumer.index');
    }
    public function destroy($id)
    {
        Consumer::findBySqid($id)->delete();
    }
}
