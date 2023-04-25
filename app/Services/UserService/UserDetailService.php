<?php
namespace App\Services\UserService;

use App\Models\UserDetail;

class UserDetailService{


          public function create($userId,$userDetail)
          {
//                    return $userDetail['title'];

                    $userDetail = UserDetail::create([
                              'user_id'=>$userId,
                              'field'=>$userDetail['title'],
                              'value'=>$userDetail['value']
                    ]);

                    return $userDetail;
          }
}
