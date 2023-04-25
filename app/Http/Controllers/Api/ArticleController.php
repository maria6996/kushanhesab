<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleListResource;
use App\Http\Resources\ArticleResource;
use App\Http\Resources\CategoryResource;
use App\Models\Article;
use App\Models\CategoryType;
use App\Models\Media;
use App\Models\Category;
use App\Models\Tag;
use App\Services\ArticleService\ArticleService;
use App\Services\MediaService\MediaService;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class ArticleController extends Controller
{
          public function __construct(protected ArticleService $articleService, protected MediaService $mediaService)
          {

          }

          public function index(Request $request)
          {
                    $response = $this->articleService->index($request);
                    $articles = ArticleListResource::collection($response);
                    return $articles;
          }

          public function store(Request $request)
          {
                    $article = $this->articleService->store($request);
//                    $category = Category::find($request->category);
//                    $this->articleService->saveCat($category, $article);
//                    $this->articleService->saveMedia($request->image, $article);
//                    $this->articleService->saveTag($request->tags, $article);

                    if (isset($request->page)) return $article;


                    return response()->json([
                              'data' => $article,
                              'message' => 'با موفقیت ایجاد شد'
                    ]);
          }

          public function show($slug)
          {

                    $article = Article::where('slug', $slug)->with(['categories', 'tags', 'medias'])->first();
                    return new ArticleResource($article);
          }

          public function update(Request $request, $slug)
          {


                    $this->articleService->update($request, $slug);

                    $article = Article::where('slug', $slug)->first();
                    $newArticleSulg = $slug;
                    $request->request->add(['page' => 'update']);
                    $article = $this->store($request);

                    return response()->json([
                              'data' => $article,
                              'message' => 'با موفقیت بروزرسانی شد'
                    ]);


          }

}
