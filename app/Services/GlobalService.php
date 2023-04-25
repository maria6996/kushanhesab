<?php

namespace App\Services;

use App\Models\Media;
use Intervention\Image\Facades\Image;

class GlobalService
{

          public static function upload($media,$model)
          {

                    if(strlen($media) > 30){
                              $strpos = strpos($media, ';');
                              $sub = substr($media, 0, $strpos);
                              $ex = explode('/', $sub)[1];
                              $name = $model->id . '_' . time() . "." . $ex;
                              $img = Image::make($media)->resize(700, 500);
                              $upload_path = public_path() . "/img/upload/article/";
                              $img->save($upload_path . $name);
                              $media = Media::create(['name' => $name,]);
                              $medias = [$media->id];
//                              $model->medias()->save($media);

                              return $medias;
                    }
          }


}
