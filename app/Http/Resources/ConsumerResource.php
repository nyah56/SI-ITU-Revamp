<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsumerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            'id'            => $this->sqid,
            'consumer_name' => $this->consumer_name,
            'phone'         => $this->phone,
            'email'         => $this->email,
            'address'       => $this->address,

        ];
    }
}
