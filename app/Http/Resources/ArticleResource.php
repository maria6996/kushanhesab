<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
          /**
           * Transform the resource into an array.
           *
           * @param \Illuminate\Http\Request $request
           * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
           */
          public function toArray($request)
          {
//           dd($this->medias->first());
                    return [
                              'id' => $this->id,
                              'title' => $this->title,
                              'type' => $this->type,
                              'status' => $this->status == 0 ? 'انتشار یافته' : 'تایید نهایی',
                              'link' => $this->link,
                              'slug' => $this->slug,
                              'tags'=>TagResource::collection( $this->tags),
                              'medias'=> new MediaResource($this->medias->first()),
                              'body'=>$this->body,
                              'category'=>new CategoryResource($this->categories->first()),
                    ];

          }
}
