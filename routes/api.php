<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CategoryTypeController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\api\TicketController;
use App\Http\Controllers\api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api-admin')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::resource('category', \App\Http\Controllers\Api\CategoryController::class)->middleware('auth:api-admin');

Route::get('/category/{type}',[CategoryController::class,'getcategories']);
Route::resource('category', CategoryController::class);
Route::apiResource('article', ArticleController::class);
Route::apiResource('ticket', TicketController::class);
Route::apiResource('user', UserController::class);
Route::apiResource('product', ProductController::class);
Route::resource('categoryType', CategoryTypeController::class);

Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);
Route::post('/register', [\App\Http\Controllers\Api\AuthController::class, 'register']);
Route::post('/uploadckeditor', [\App\Http\Controllers\Api\ImageController::class, 'uploadImage'])->name('uploadckeditor');


