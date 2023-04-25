<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\ProductService\ProductService;
use App\Services\UserService\UserDetailService;
use App\Services\UserService\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
          //

          public function __construct(protected UserService $userService, protected ProductService $service, protected UserDetailService $userDetailService)
          {

          }

          public function index()
          {

                    $users = UserResource::collection(User::all());

                    $i = 1;
                    $result = [];
                    foreach ($users as $item) {


                              $seviceNames = [];
//                              if ($item->services != null) {
//                                        return $item->services->pluck('title','id');
//
//                                        foreach ($item->services as $service) {
//                                                  $seviceNames[] = \App\Models\ProductService::where('id', $service)->pluck(['title', 'id']);
//                                        }
//                              }


                              $result[] = [
                                        'counter' => $i++,
                                        'name' => $item->name,
                                        'mobile' => $item->mobile,
                                        'phone' => $item->phone,
                                        'address' => $item->address,
                                        'services'=>$item->services->pluck('title')
                              ];

                    }
                    return $result;
          }

          public function store(Request $request)
          {

                    $validator = Validator::make($request->all(), [
                              'name' => 'required',
                              'mobile' => 'required|unique:users',
                              'phone' => 'required',
                              'address' => 'required',
                              'password' => 'required|min:6',
                    ]);

//                    return $request;
                    if ($validator->fails()) {

                              return response()->json([
                                        'status' => '400',
                                        'data' => $validator->errors(),
                              ]);
                    }

                    $response = $this->userService->create($request);
                    return response()->json([
                              'status' => 'success',
                              'data' => $response,
                              'message' => 'User Created'
                    ]);


          }

          public function show()
          {

          }

          public function update()
          {

          }

          public function destroy()
          {

          }
}
