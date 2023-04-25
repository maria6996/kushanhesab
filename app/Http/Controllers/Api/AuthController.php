<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
          //
          public function __construct()
          {
          }


          public function register(Request $request): \Illuminate\Http\JsonResponse
          {

                    $validator = Validator::make($request->all(), [
                              'full_name' => 'required',
                              'email' => 'required|email|unique:admins',
                              'password' => 'required',
                              'c_password' => 'required|same:password',]);

                    if ($validator->fails()) {
                              $response = [
                                        'success' => false,
                                        'message' => $validator->errors()
                              ];
                              return response()->json($response, 400);
                    }

                    $input = $request->all();
                    $input['password'] = bcrypt($input['password']);
                    $user = Admin::create($input);
                    $success['token'] = $user->createToken('MyApp')->accessToken;
                    $success['full_name'] = $user->full_name;


                    $response = [
                              'success' => true,
                              'data' => $success,
                              'message' => 'User register successfully'
                    ];

                    return response()->json($response, 200);

          }

          public function getValidate($request): string
          {
                    $username = $request->username;
                    if (filter_var($username, FILTER_VALIDATE_EMAIL)) $username = 'email';
                    else $username = 'mobile';
                    return $username;
          }

          public function login(Request $request): \Illuminate\Http\JsonResponse
          {

                    $validate = $this->getValidate($request);

                    $credentials = $validate == 'mobile' ? ['mobile' => $request->username, 'password' => $request->password] : ['email' => $request->username, 'password' => $request->password];


                    if (Auth::guard('admin')->attempt($credentials)) {
                              $user = Auth::guard('admin')->user();
                              $user['token'] = $user->createToken('MyApp')->accessToken;
//            $token = $user->createToken('Laravel-9-Passport-Auth')->accessToken;
                              $response = [
                                        'success' => true,
                                        'data' => $user,
                                        'message' => 'User exists!'
                              ];

                              return response()->json($response);
                    } else {

                              $response = [
                                        'success' => false,
                                        'data' => '',
                                        'message' => 'User Not Fount'
                              ];

                              return $response::json($response);
                    }

          }
}
