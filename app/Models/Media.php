<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
          use HasFactory;

          protected $table = 'medias';

          protected $fillable = ['name', 'extension'];


          public function articles()
          {
                    return $this->morphedByMany(Article::class, 'mediable');
          }

          public function products()
          {
                    return $this->morphedByMany(Product::class, 'mediable');
          }

}
