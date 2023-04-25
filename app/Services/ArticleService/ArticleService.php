<?php

namespace App\Services\ArticleService;


use App\Models\Article;
use App\Models\Category;
use App\Models\CategoryType;
use App\Models\Media;
use App\Models\Tag;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class ArticleService
{

          public function index( $request)
          {
                    if (isset($request->type)) {
                              $type = $this->getTypeValue($request->type);
                              $articles = Article::where('type', $type)->with(['categories', 'tags', 'medias'])->get();
                    }
//                     elseif(isset($request->slug)){
//                               $article = Article::where('slug',$request->slug)->with(['categories', 'tags', 'medias'])->first();
//                               return new ArticleResource($article);
// //                              return $articles;
//                     }
                    else {
                              $articles = Article::with(['categories', 'tags', 'medias'])->get();

                    }

                    return $articles;

          }

          public function store(Request $request)
          {

                    $article = Article::create([
                              'title' => $request->title,
                              'body' => $request->body ?? '',
                              'link' => $request->link,
                              'type' => $request->link != '' ? 'ویدئو':'مقاله',
                              'status' => 0,
                    ]);


                    $category = Category::find($request->category);
                    $this->saveCat($category, $article);
                    $this->saveMedia($request->image, $article);
                    $this->saveTag($request->tags, $article);

                    return $article;
          }

          public function saveCat($cat,$article)
          {
               $article->categories()->save($cat);

          }

          public function saveTag($tags,$article)
          {
                    foreach ($tags as $item) {
                              $tag = Tag::where('name', $item)->first();
                              if (!$tag) {
                                        $tag = Tag::create(['name' => $item]);
                              }
                              $all[] = $tag->id;
                    }

                    $article->tags()->sync($all);
          }

          public function saveMedia($media,$article)
          {

                      if(strlen($media) > 30){
                                          $strpos = strpos($media, ';');
                                          $sub = substr($media, 0, $strpos);
                                          $ex = explode('/', $sub)[1];
                                          $name = $article->id . '_' . time() . "." . $ex;
                                          $img = Image::make($media)->resize(700, 500);
                                          $upload_path = public_path() . "/img/upload/article/";
                                          $img->save($upload_path . $name);
                                          $media = Media::create(['name' => $name,]);
                                          $medias = [$media->id];
                                          $article->medias()->save($media);
                      }

          }


          public function getTypeValue($type)
          {
                    $type = $type == 1 ? 'ویدئو':'مقاله';
                    return $type;

          }


          public function update($request,$slug)
          {
                    $article = Article::where('slug', $slug)->first();
                    $newArticleSulg = $slug;
                    $request->request->add(['page' => 'update']);
                    $article = $this->store($request);

          }


}
