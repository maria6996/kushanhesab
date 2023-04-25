<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

          use HasFactory, Sluggable;

          protected $fillable = ['title', 'slug', 'status', 'short_description','long_description','media_id'];

//          protected $table ='services';

          public function sluggable(): array
          {
                    return [
                              'slug' => [
                                        'source' => 'title'
                              ]
                    ];
          }


          public function Users()
          {
                    return $this->belongsToMany(User::class,'user_services');
          }

          public function medias(){

                    return $this->morphToMany(Media::class,'mediable');
          }

          public function categories(){

                    return $this->morphToMany(Category::class,'categorable');
          }
}
