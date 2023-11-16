<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use Illuminate\Http\Request;
use App\Http\Resources\MediaResource;
use App\Http\Requests\StoreMediaRequest;
use App\Repositories\MediaRepository;

class MediaController extends AdminController
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(private MediaRepository $repository)
    {
        // 
    }

    public function list(Request $request)
    {
        return MediaResource::collection(
            $this->repository->list(
                ['name' => $request->get('query'), 'file' => true],
                $request->get('per_page'),
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMediaRequest $request)
    {
        $this->repository->create($request->file);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function seq(int $id, Request $request)
    {
        $this->repository->update([
            'seq' => $request->get('seq'),
        ], $id);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->repository->delete($id);
    }
}
