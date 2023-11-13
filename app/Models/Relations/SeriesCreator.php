<?php

namespace App\Models\Relations;

use App\Models\Config;
use App\Models\Series;
use App\Models\SharedSeries;
use Carbon\Carbon;

trait SeriesCreator
{
    public function createNextSeries(bool $priority = false)
    {
        $series = $this->currentSeries($priority);

        if (!$series) {
            $series = $this->createSeries($priority);
        }

        $series->num = $this->getNextSeriesNum($priority);
        $series->num_fulltext = $this->getNextSeriesNumFullText($priority);
        $series->save();
    }

    public function createSeries($priority = false)
    {
        $shared = null;
        if ($this->capatureHasAnySharedSeries($priority)) {
            $shared = $this->captureSharedSeries($priority);
        }
        $series = new Series();
        $series->account_type_id = $shared ? null : $this->id;
        $series->shared_series_id = $shared?->id;
        $series->priority = $priority;

        return $series;
    }
}