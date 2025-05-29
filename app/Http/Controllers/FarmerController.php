<?php
namespace App\Http\Controllers;

use App\Http\Resources\FarmerResource;
use App\Models\Farmer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FarmerController extends Controller
{
    //
    public function index()
    {
        $farmers = FarmerResource::collection(Farmer::all());

        return Inertia::render('farmer/index', compact('farmers'));
    }

    public function store(Request $request)
    {
        Farmer::create($request->all());
        return to_route('farmer.index');
    }
    public function show($id)
    {
        return Farmer::findBySqid($id);
    }
    public function update(Request $request, $id)
    {
        Farmer::findBySqid($id)->update($request->all());
        return to_route('farmer.index');
    }
    public function destroy($id)
    {
        Farmer::findBySqid($id)->delete();
    }
}
