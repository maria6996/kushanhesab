<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

//    protected $guard = "admin";
    protected $fillable = [
        'full_name',
        'email',
        'mobile',
        'phone',
        'image',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

}
