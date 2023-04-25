<?php

namespace App\Services\UserService;

use App\Models\User;
use App\Models\Product as ServiceModel;
use App\Services\ProductService\ProductService;
use \App\Services\UserService\UserDetailService;
use Illuminate\Http\Request;

class UserService
{
          public function __construct(protected UserDetailService $userDetailService, protected ProductService $service)
          {
          }

          public function create(Request $request)
          {
                    $user = User::create([
                              'name' => $request->name,
                              'mobile' => $request->mobile,
                              'phone' => $request->phone,
                              'address' => $request->address,
                              'password' => bcrypt($request->password),

                    ]);


                    if (isset($request->services) && $request->services != null) {

                              foreach ($request->services as $item) {
                                        $service = ServiceModel::where('title', $item)->first();
                                        if ($service) $this->service->createUserService($service->id, $user->id);
                                        else {

                                                  $request->request->add(['title'=>$item]);
                                                  $service1 = $this->service->createProductQuick($request);
                                                  $this->service->createUserService($service1->id, $user->id);
                                        }
                              }
                    }


//                    return $request->userDetail;

                    if (isset($request->userDetail) && $request->userDetail != null) {
                              foreach ($request->userDetail as $key=>$item) {
                                        if($item['title'] !=null && $item['value'] !=null){
                                                  $this->userDetailService->create($user->id, $item);
                                        }

                              }
                    }

                    return [
                              'user' => $user,
                              'details' => $user->details,
                              'services' => $user->services
                    ];


          }


}
