<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\UserTest;
use App\Models\Category;
use App\Models\CategoryType;
use App\Models\Media;
use App\Services\CategoryService\CategoryService;
use App\Services\CategoryTypeService\CategoryTypeService;
use App\Services\MediaService\MediaService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{


          public function __construct(protected CategoryService     $categoryService,
                                      protected CategoryTypeService $categoryTypeService,
                                      protected MediaService        $mediaService)
          {

          }

          public function index()
          {
                    $categories = Category::with(['categoryType', 'parent'])->get();
                    $categories = CategoryResource::collection($categories);
                    return $categories;
          }


          /**
           * Store a newly created resource in storage.
           *
           * @param \Illuminate\Http\Request $request
           * @return \Illuminate\Http\JsonResponse
           */
          public function store(Request $request)
          {

                    $validator = Validator::make($request->all(), [
                              'title' => 'required',
                              'type' => 'required',
                    ]);

                    $response = $this->categoryService->store($request);
                    return response()->json($response);

          }

          /**
           * Display the specified resource.
           *
           * @param \App\Models\rc $rc
           * @return \Illuminate\Http\Response
           */
          public function show(rc $rc)
          {
                    //
          }

          /**
           * Show the form for editing the specified resource.
           *
           * @param \App\Models\rc $rc
           * @return \Illuminate\Http\Response
           */
          public function edit(rc $rc)
          {
                    //
          }

          /**
           * Update the specified resource in storage.
           *
           * @param \Illuminate\Http\Request $request
           * @param \App\Models\rc $rc
           * @return \Illuminate\Http\Response
           */
          public function update(Request $request, rc $rc)
          {
                    //
          }

          /**
           * Remove the specified resource from storage.
           *
           * @param \App\Models\rc $rc
           * @return \Illuminate\Http\JsonResponse
           */
          public function destroy(Category $category)
          {

                   $result = $this->categoryService->delete($category);
                    return response()->json([
                              'data' => $result,
                              'message' => 'با موفقیت حذف شد']);
          }

          public function getcategories($type)
          {
                    $result = $this->categoryService->getcatgories($type);
                    return response()->json(['data' => $result]);

          }
}
