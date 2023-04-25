<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory,Sluggable;

    protected $fillable = ['title','slug','body','description','link','status'];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    public function tags(){

        return $this->morphToMany(Tag::class,'taggable');
    }

    public function categories(){

        return $this->morphToMany(Category::class,'categorable');
    }

    public function medias(){

        return $this->morphToMany(Media::class,'mediable');
    }
}
