<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'title' => $this->title,
            'parent' => $this->parent_id,
//            'category_type_id' => $this->category_type_id,
//            'parent' => new CategoryResource($this->parent),
//            'category_type' => new CategoryTypeResource($this->categoryType),
        ];
    }
}
