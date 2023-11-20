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
        if ($priority) {
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

        return $this->seriesConditions(Series::whereSharedSeriesId($shared->id), $priority)
            ->whereDate('created_at', Carbon::now()->format('Y-m-d'))
            ->orderBy('id', 'desc')->first();

    }

    public function currentSeries($priority): ?Series
    {
        if ($this->capatureHasAnySharedSeries($priority)) {
            return $this->currentSharedSeries($priority);
        }

        return $this->seriesConditions($this->series(), $priority)
            ->whereDate('created_at', Carbon::now()->format('Y-m-d'))
            ->orderBy('id', 'desc')->first();
    }

    protected function seriesConditions($query, bool $priority)
    {
        // If priority and separate series
        return $query->when($priority && Config::isPrioritySeriesSeparate(), function ($builder) {
            $builder->where('priority', true);
        })
            // Continues series
            ->when($priority && !Config::isPrioritySeriesSeparate(), function ($builder) {
                if ($this->capatureHasAnySharedSeries() && $this->captureHasPrioritySharedSeries()) {
                    $builder->where('priority', true);
                } else {
                    $builder->where('priority', false);
                }
            })
            ->when(!$priority, function ($builder) {
                $builder->where('priority', false);
            });
    }
}