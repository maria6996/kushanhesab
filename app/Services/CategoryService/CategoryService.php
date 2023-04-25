<?php

namespace App\Services\CategoryService;


use App\Models\Category;
use App\Models\CategoryType;
use Illuminate\Http\Response;

class CategoryService
{


          public function getcatgories($type)
          {
                    $categories = Category::with(['parent'])->where('category_type_id', $type)->select(['id', 'title', 'parent_id'])->get();
                    $result = [];

                    foreach ($categories as $index => $item) {
                              $result[] = [
                                        'id' => $item->id,
                                        'title' => $item->title,
                                        'parent' => $item->parent ? $item->parent->title : 'ROOT'
                              ];
                    }

                    return $result;
          }

          public function getCats($id)
          {
                    $categories = Category::where('category_type_id', $id)->select(['id', 'title', 'parent_id'])->get();
                    return $categories;

          }


          public function store($request)
          {

                    $category = $this->isValidCategory($request);


                    if (!$category) {

                              $category = Category::create([
                                        'title' => $request->title,
                                        'category_type_id' => $request->type,
                                        'parent_id' => $request->category ?? null

                              ]);

                              $response['data'] = $this->getCats($request->type);
                              $response['Message'] = 'دسته بندی با موفقیت ایجاد شد';

                    } else {

                              $response['data'] = '';
                              $response['Message'] = 'این دسته بندی از قبل ثبت شده است';

                    }

                    return $response;
          }

          public function isValidCategory($request)
          {
                    $category = Category::where('title', $request->title)->where('category_type_id', $request->type)->where('parent_id', $request->category)->first();
                    return $category;

          }

          public function delete($category)
          {
                    $type = $category->category_type_id;
                    $categories = Category::where('category_type_id', $type)->where('id', '!=', $category->id)->get();
                    $category->delete();

                    return $categories;


          }

}
