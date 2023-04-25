<?php

namespace App\Services\CategoryTypeService;


use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryTypeCollection;
use App\Http\Resources\CategoryTypeResource;
use App\Models\Category;
use App\Models\CategoryType;
use Illuminate\Support\Facades\Validator;

class CategoryTypeService
{

    public function all()
    {
        $categoryTypes = CategoryType::all();
        return $categoryTypes;
    }

    public function getTypes()
    {


        $types = CategoryType::select('id', 'title')->get();
        return $types;

//       $all = array_merge(['' => 'Please Select'], $cats);
//       return $cats;

//        $types = CategoryTypeResource::collection($cats);
    }


    public function store($request)
    {

        $categoryType = CategoryType::create([
            'title' => $request->title,
        ]);

        $response = $this->all();
        return CategoryTypeResource::collection($response);
    }
}
