<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ImageController extends Controller
{
          //
          public function uploadImage(Request $request)
          {


                    try {
                              $originName = $request->file('upload')->getClientOriginalName();
                              $fileName = pathinfo($originName, PATHINFO_FILENAME);
                              $extension = $request->file('upload')->getClientOriginalExtension();
                              $fileName = $fileName . '_' . time() . '.' . $extension;
                              $request->file('upload')->move(public_path('images'), $fileName);
                              $CKEditorFuncNum = $request->input('CKEditorFuncNum');
                              $url = asset('images/' . $fileName);
                              $msg = 'Image uploaded successfully';
                              @header('Content-type: text/html; charset=utf-8');
                              return response()->json(['fileName' => $fileName, 'uploaded' => 1, 'url' => 'http://127.0.0.1:8000/images/' . $fileName], 200);
                    } catch (\Exception $exception) {

                              return httpStatusCode::status500();
                    }
          }

}
