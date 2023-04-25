<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{


          /**
           * Transform the resource into an array.
           *
           * @param \Illuminate\Http\Request $request
           * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
           */
          public function toArray($request)
          {

                    return [
                              'id' => $this->id,
                              'name' => $this->name,
                              'email' => $this->email,
                              'mobile' => $this->mobile,
                              'phone' => $this->phone,
                              'address' => $this->address,
//                              'services' => ProductResource::collection($this->services) ,
                              'services' => $this->services->pluck('title','id') ,
                    ];
          }
}
