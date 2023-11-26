<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\AdminController;
use App\Http\Requests\StoreAdvancePrintRequest;
use App\Repositories\QuRepository;
use App\Repositories\AccountTypeRepository;
use App\Services\Series;
use App\Services\Printer;
use Limetec\PhpNetworkLprPrinter\PhpNetworkLprPrinter;

class AdvancePrintController extends AdminController
{
    /**
     * Display a listing of the resource.
     */
    public function __construct(protected QuRepository $repository, protected AccountTypeRepository $accountTypeRepository)
    {
        // 
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->render('admin/advance-print/index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAdvancePrintRequest $request)
    {
        $create = function () use ($request) {
            $validated = $request->validated();
            $accountTypeId = $validated['account_type_id'];
            $count = $validated['count'];
            $data = [];
            for ($i = $count; $i > 0; $i--) {
                $series = Series::generate(
                    $this->accountTypeRepository->find($accountTypeId),
                    false
                );
                $this->repository->create([
                    'type' => 'other',
                    'account_type_id' => $accountTypeId,
                    'name' => '',
                    'student_no' => '',
                    'student_name' => '',
                    'is_representative' => false,
                    'priority' => false,
                    'num_fulltext' => $series->num_fulltext,
                    'num' => $series->num,
                    'is_advance' => true
                ]);
                $data[] = $series->num_fulltext;
            }

            return $data;
        };

        return $this->render('admin/advance-print/index', [
            'data' => $create()
        ]);
    }
}
