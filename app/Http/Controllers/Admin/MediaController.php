<?php

namespace App\Http\Controllers\Admin;

use App\Events\MediaRefresh;
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
                query: ['name' => $request->get('query'), 'file' => true],
                perPage: $request->get('per_page'),
                orderBy: ['seq', 'asc']
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMediaRequest $request)
    {
        $this->repository->create($request->file);

        MediaRefresh::dispatch();
    }

    /**
     * Update sequence
     */
    public function seq(int $id, Request $request)
    {
        $this->repository->update([
            'seq' => $request->get('seq'),
        ], $id);

        MediaRefresh::dispatch();
    }

    /**
     * Update active status
     */
    public function active(int $id, Request $request)
    {
        $this->repository->update([
            'active' => $request->get('active'),
        ], $id);

        MediaRefresh::dispatch();
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->repository->delete($id);

        MediaRefresh::dispatch();
    }
}
