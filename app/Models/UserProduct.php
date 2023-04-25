<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProduct extends Model
{
    use HasFactory;

//    protected $table = ['user_services'];
    protected $fillable = ['user_id','product_id','status'];

//    protected $table = ['user_services']




}
