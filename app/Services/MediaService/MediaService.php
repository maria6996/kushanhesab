<?php

namespace App\Services\MediaService;

use App\Models\Media;

class MediaService
{

    public function get_images($userId)
    {

        $images = Media::where('creator_id',$userId)->get();

        return $images;

    }

}
