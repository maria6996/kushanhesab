<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
                  'id'=>$this->id,
                  'title'=>$this->title,
//                  'status'=>$this->status == 0 ? 'غیرفعالی':'فعال'
        ];
    }
}
