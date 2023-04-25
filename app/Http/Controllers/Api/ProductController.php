<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //

          public function __construct(Protected ProductService $productService)
          {

          }

          public function index()
          {
               $products= ProductResource::collection(Product::all());
               return ['data'=>$products];
          }

          public function store(Request $request)
          {

                    $validate = $request->validate([
                             'name'=>'required',
                             'media_id'=>'required',
                             'short_description'=>'required',
                              'long_description'=>'required',
                              'medias'=>'required',
                    ]);


                    $product = $this->productService->createProductQuick($request);


                    return response()->json($product);


          }
}
