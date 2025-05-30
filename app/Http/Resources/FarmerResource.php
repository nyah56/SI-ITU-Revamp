<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FarmerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            'id'          => $this->sqid,
            'farmer_name' => $this->farmer_name,
            'phone'       => $this->phone,
            'email'       => $this->email,
            'address'     => $this->address,

        ];
    }
}
