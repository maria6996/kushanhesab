<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
          use HasApiTokens, HasFactory, Notifiable;


          /**
           * The attributes that are mass assignable.
           *
           * @var array<int, string>
           */
          protected $fillable = [
                    'name',
                    'email',
                    'password',
                    'phone',
                    'mobile',
                    'address',
                    'status'
          ];

          /**
           * The attributes that should be hidden for serialization.
           *
           * @var array<int, string>
           */
          protected $hidden = [
                    'password',
                    'remember_token',
          ];

          /**
           * The attributes that should be cast.
           *
           * @var array<string, string>
           */
          protected $casts = [
                    'email_verified_at' => 'datetime',
          ];



          public function services()
          {
                return $this->belongsToMany(Product::class,'user_products');

          }

          public function details()
          {
                    return $this->hasMany(UserDetail::class,'user_id');
          }
}
