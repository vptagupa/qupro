<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use App\Http\Resources\AuditResource;
use App\Repositories\AuditRepository;
use Illuminate\Http\Request;

class AuditController extends AdminController
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(private AuditRepository $repository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/audit/index');
    }

    public function list(Request $request)
    {
        return AuditResource::collection(
            $this->repository->list(
                query: ['auditable_type' => $request->get('query'), 'user' => true],
                perPage: $request->get('per_page'),
                orderBy: ['created_at', 'desc']
            )
        );
    }
}
