<?php

namespace Tests\Unit;

use App\Models\AccountType;
use App\Models\Config;
use App\Models\NumFormat;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTruncation;
use App\Services\Series;

class SeriesTest extends TestCase
{
    use DatabaseTruncation;

    /**
     * A test for generating regular series.
     */
    public function test_regular_series_are_correct(): void
    {
        $title = 'Format';
        $affix = 'X';
        $delimiter = '-';
        $exp = "{$affix}{$delimiter}%s";

        $format = NumFormat::factory()->create([
            'title' => $title,
            'affix' => $affix,
            'delimiter' => $delimiter,
            'format' => '{affix}{delimiter}{series}',
        ]);

        $accountType = AccountType::factory()->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        $series1 = Series::generate($accountType, false);
        $series2 = Series::generate($accountType, false);
        $series3 = Series::generate($accountType, false);

        $this->assertEquals([1, 2, 3], [$series1->num, $series2->num, $series3->num]);
        $this->assertEquals([
            sprintf($exp, 1), sprintf($exp, 2), sprintf($exp, 3)],
            [$series1->num_fulltext, $series2->num_fulltext, $series3->num_fulltext]
        );
    }

    /**
     * A test for generating priority series.
     */
    public function test_priority_series_are_correct(): void
    {
        $title = 'Format';
        $affix = 'P';
        $delimiter = '-';
        $exp = "{$affix}{$delimiter}%s";

        $format = NumFormat::factory()->create([
            'title' => $title,
            'affix' => $affix,
            'delimiter' => $delimiter,
            'format' => '{affix}{delimiter}{series}',
        ]);

        $accountType = AccountType::factory()->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        $series1 = Series::generate($accountType, true);
        $series2 = Series::generate($accountType, true);
        $series3 = Series::generate($accountType, true);

        $this->assertEquals([1, 2, 3], [$series1->num, $series2->num, $series3->num]);
        $this->assertEquals([
            sprintf($exp, 1), sprintf($exp, 2), sprintf($exp, 3)],
            [$series1->num_fulltext, $series2->num_fulltext, $series3->num_fulltext]
        );
    }

    public function test_regular_series_separate_series_are_correct(): void
    {
        $title = 'Format';
        $affix = 'P';
        $delimiter = '-';
        $exp = "{$affix}{$delimiter}%s";

        $format = NumFormat::factory()->create([
            'title' => $title,
            'affix' => $affix,
            'delimiter' => $delimiter,
            'format' => '{affix}{delimiter}{series}',
        ]);

        $accountType = AccountType::factory()->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        $this->seed(\Database\Seeders\GlobalConfigSeeder::class);

        Config::where('name', 'Priority Series Separate')
            ->update([
                'value' => true,
            ]);

        $series1 = Series::generate($accountType, true);
        $series2 = Series::generate($accountType, false);
        $series3 = Series::generate($accountType, true);
        $series4 = Series::generate($accountType, false);
        $series5 = Series::generate($accountType, true);
        $series6 = Series::generate($accountType, false);

        $this->assertEquals([1, 2, 3], [$series2->num, $series4->num, $series6->num]);
        $this->assertEquals([
            sprintf($exp, 1), sprintf($exp, 2), sprintf($exp, 3)],
            [$series2->num_fulltext, $series4->num_fulltext, $series6->num_fulltext]
        );
    }

    public function test_priority_series_separate_series_are_correct(): void
    {
        $title = 'Format';
        $affix = 'P';
        $delimiter = '-';
        $exp = "{$affix}{$delimiter}%s";

        $format = NumFormat::factory()->create([
            'title' => $title,
            'affix' => $affix,
            'delimiter' => $delimiter,
            'format' => '{affix}{delimiter}{series}',
        ]);

        $accountType = AccountType::factory()->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        $this->seed(\Database\Seeders\GlobalConfigSeeder::class);

        Config::where('name', 'Priority Series Separate')
            ->update([
                'value' => true,
            ]);

        $series1 = Series::generate($accountType, true);
        $series2 = Series::generate($accountType, false);
        $series3 = Series::generate($accountType, true);
        $series4 = Series::generate($accountType, false);
        $series5 = Series::generate($accountType, true);

        $this->assertEquals([1, 2, 3], [$series1->num, $series3->num, $series5->num]);
        $this->assertEquals([
            sprintf($exp, 1), sprintf($exp, 2), sprintf($exp, 3)],
            [$series1->num_fulltext, $series3->num_fulltext, $series5->num_fulltext]
        );
    }

    public function test_regular_series_continues_series_are_correct(): void
    {
        $title = 'Format';
        $affix = 'P';
        $delimiter = '-';
        $exp = "{$affix}{$delimiter}%s";

        $format = NumFormat::factory()->create([
            'title' => $title,
            'affix' => $affix,
            'delimiter' => $delimiter,
            'format' => '{affix}{delimiter}{series}',
        ]);

        $accountType = AccountType::factory()->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        $this->seed(\Database\Seeders\GlobalConfigSeeder::class);

        Config::where('name', 'Priority Series Separate')
            ->update([
                'value' => false,
            ]);

        $series1 = Series::generate($accountType, true);
        $series2 = Series::generate($accountType, false);
        $series3 = Series::generate($accountType, true);
        $series4 = Series::generate($accountType, false);
        $series5 = Series::generate($accountType, true);
        $series6 = Series::generate($accountType, false);

        $this->assertEquals([2, 4, 6], [$series2->num, $series4->num, $series6->num]);
        $this->assertEquals([
            sprintf($exp, 2), sprintf($exp, 4), sprintf($exp, 6)],
            [$series2->num_fulltext, $series4->num_fulltext, $series6->num_fulltext]
        );
    }

    public function test_priority_series_continues_series_are_correct(): void
    {
        $title = 'Format';
        $affix = 'P';
        $delimiter = '-';
        $exp = "{$affix}{$delimiter}%s";

        $format = NumFormat::factory()->create([
            'title' => $title,
            'affix' => $affix,
            'delimiter' => $delimiter,
            'format' => '{affix}{delimiter}{series}',
        ]);

        $accountType = AccountType::factory()->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        $this->seed(\Database\Seeders\GlobalConfigSeeder::class);

        Config::where('name', 'Priority Series Separate')
            ->update([
                'value' => false,
            ]);

        $series1 = Series::generate($accountType, true);
        $series2 = Series::generate($accountType, false);
        $series3 = Series::generate($accountType, true);
        $series4 = Series::generate($accountType, false);
        $series5 = Series::generate($accountType, true);
        $series6 = Series::generate($accountType, false);

        $this->assertEquals([1, 3, 5], [$series1->num, $series3->num, $series5->num]);
        $this->assertEquals([
            sprintf($exp, 1), sprintf($exp, 3), sprintf($exp, 5)],
            [$series1->num_fulltext, $series3->num_fulltext, $series5->num_fulltext]
        );
    }
}
