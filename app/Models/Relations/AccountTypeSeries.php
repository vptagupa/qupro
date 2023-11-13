<?php

namespace App\Models\Relations;

use App\Models\Config;
use App\Models\Series;
use App\Models\SharedSeries;
use Carbon\Carbon;

trait AccountTypeSeries
{
    public function captureSharedSeries($priority): SharedSeries
    {
        $shared = null;
        if ($priority && Config::isPrioritySeriesSeparate()) {
            $shared = $this->getPrioritySharedSeries();
        }

        if (!$shared) {
            $shared = $this->getNonPrioritySharedSeries();
        }

        return $shared;
    }

    public function currentSharedSeries($priority): ?Series
    {
        $shared = $this->captureSharedSeries($priority);

        return Series::whereSharedSeriesId($shared->id)
            ->when($priority && Config::isPrioritySeriesSeparate(), function ($builder) {
                $builder->where('priority', true);
            })
            ->when(!$priority || !Config::isPrioritySeriesSeparate(), function ($builder) {
                $builder->where('priority', false);
            })
            ->whereDate('created_at', Carbon::now()->format('Y-m-d'))
            ->orderBy('id', 'desc')->first();

    }

    public function currentSeries($priority): ?Series
    {
        if ($this->capatureHasAnySharedSeries($priority)) {
            return $this->currentSharedSeries($priority);
        }

        return $this->series()->when($priority && Config::isPrioritySeriesSeparate(), function ($builder) {
            $builder->where('priority', true);
        })
            ->whereDate('created_at', Carbon::now()->format('Y-m-d'))
            ->orderBy('id', 'desc')->first();
    }
}