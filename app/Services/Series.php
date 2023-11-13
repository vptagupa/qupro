<?php

namespace App\Services;

use App\Models\AccountType;
use App\Repositories\SeriesRepository;
use Illuminate\Support\Facades\App;
use App\Models\Config;
use App\Models\Series as Model;

class Series
{
    private $accountType;

    public function __construct(private SeriesRepository $repository)
    {

    }

    public static function generate(AccountType $accountType, bool $priority = false): Model
    {
        $series = new self(App::make(SeriesRepository::class));

        return $series->create($accountType, $priority);
    }

    public function create(AccountType $accountType, bool $priority): Model
    {
        $this->accountType = $accountType;

        if (is_null($this->accountType)) {
            throw new \Exception("Account type is required.");
        }

        return $this->createNext($priority);
    }

    public function createNext(bool $priority = false)
    {
        $series = $this->accountType->currentSeries($priority);

        if (!$series) {
            $series = $this->createNew($priority);
        }

        $series->num = $this->nextSeriesNum($priority);
        $series->num_fulltext = $this->numFullText($series->num, $priority);
        $series->save();

        return $series;
    }

    public function createNew($priority = false)
    {
        $shared = null;
        if ($this->accountType->capatureHasAnySharedSeries($priority)) {
            $shared = $this->accountType->captureSharedSeries($priority);
        }

        return $this->repository->create([
            'account_type_id' => $shared ? null : $this->accountType->id,
            'shared_series_id' => $shared?->id,
            'num' => 0,
            'num_fulltext' => '',
            'priority' => $priority
        ]);
    }

    public function getStartNum($priority)
    {
        $num = $this->accountType->num_start;
        if ($this->accountType->capatureHasAnySharedSeries($priority)) {
            $num = $this->accountType->captureSharedSeries($priority)?->num_start;
        }

        return $num;
    }

    public function nextSeriesNum($priority = false)
    {
        $series = $this->accountType->currentSeries($priority);

        // Use default num
        $num = $this->getStartNum($priority);
        // Increase series if exists
        if ($series?->num) {
            $num = $series->num + 1;
        }
        // use global config instead
        if (!$num) {
            $num = Config::numstart() ?? 1;
        }

        return $num;
    }

    public function numFullText($num, $priority = false): string
    {
        if ($this->accountType->capatureHasAnySharedSeries($priority)) {
            $sharedSeries = $this->accountType->captureSharedSeries($priority);
            if ($sharedSeries->format) {
                return $sharedSeries->format->fulltext($num);
            }
        }

        if ($priority && $this->accountType->priorityFormat) {
            return $this->accountType->priorityFormat->fulltext($num);
        }

        return $this->accountType->format->fulltext($num);
    }
}