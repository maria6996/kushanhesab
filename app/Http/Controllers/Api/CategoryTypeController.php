<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryTypeResource;
use App\Services\CategoryService\CategoryService;
use App\Services\CategoryTypeService\CategoryTypeService;
use App\Services\MediaService\MediaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryTypeController extends Controller
{
    //
    public function __construct(protected CategoryTypeService $categoryTypeService)
    {

    }

    public function index()
    {
        $types = $this->categoryTypeService->getTypes();
        return $types;
    }

    public function store(Request $request)
    {

        $validator = $this->validate($request,['title'=>'required']);
        $response =  $this->categoryTypeService->store($request);

        return  $response;
    }
}
