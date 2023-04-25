<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['category_type_id', 'title','parent_id'];


    public function articles()
    {
        return $this->morphedByMany(Article::class, 'categorable');
    }



    public function products()
    {
        return $this->morphedByMany(Product::class, 'categorable');
    }

    public function categoryType()
    {
        return $this->belongsTo(CategoryType::class,'category_type_id');
    }

    public function parent(){
        return $this->belongsTo(Category::class,'parent_id');
    }
}
