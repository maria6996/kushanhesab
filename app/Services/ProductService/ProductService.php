<?php

namespace App\Services\ProductService;


use App\Models\User;
use App\Models\UserProduct;
use App\Models\Product as ServiceModel;
use App\Services\GlobalService;

class ProductService
{

          public function __construct(protected UserProduct $userService)
          {

          }

          public function createProductQuick($request)
          {


                    $product = ServiceModel::create([
                              'title' => $request->title,
                              'short_description' => $request->short_description ?? null,
                              'long_description' => $request->long_description ?? null,
                    ]);

                    if(isset($request->media) && $request->media != null){

                              $media = GlobalService::upload($request->media,$product);
                              if(count($media) == 1) $product->update(['media_id'=>$media]);
                    }

                    if(isset($request->moremedia) && $request->moremedia != null){

                              $media = GlobalService::upload($request->moremedia,$product);
                              if(count($media) > 0) $product->medias()->save($media);
                    }


                    return $product;

          }

          public function createUserService($productId, $userId)
          {

                    $userService = UserProduct::create([
                              'product_id' => $productId,
                              'user_id' => $userId
                    ]);

                    return $userService;
          }
}
