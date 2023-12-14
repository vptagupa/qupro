<?php

namespace Tests\Unit;

use App\Models\AccountType;
use App\Models\Config;
use App\Models\NumFormat;
use App\Models\SharedSeries;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTruncation;
use App\Services\Series;

class SharedSeriesTest extends TestCase
{
    use DatabaseTruncation;

    public function test_regular_shared_series_are_correct(): void
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

        $sharedAccountTypes = AccountType::factory()->count(3)->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        SharedSeries::factory()->create([
            'account_type_ids' => $sharedAccountTypes->pluck('id')->toArray(),
            'num_format_id' => $format->id,
            'num_start' => 1,
            'priority' => false
        ]);

        $series1 = Series::generate($accountType, false);
        $series2 = Series::generate($sharedAccountTypes[0], false);
        $series3 = Series::generate($accountType, false);
        $series4 = Series::generate($sharedAccountTypes[1], false);
        $series5 = Series::generate($accountType, false);
        $series6 = Series::generate($sharedAccountTypes[2], false);

        $this->assertEquals([1, 2, 3], [$series2->num, $series4->num, $series6->num]);
        $this->assertEquals([
            sprintf($exp, 1), sprintf($exp, 2), sprintf($exp, 3)],
            [$series2->num_fulltext, $series4->num_fulltext, $series6->num_fulltext]
        );
    }

    public function test_priority_shared_series_are_correct(): void
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

        $sharedAccountTypes = AccountType::factory()->count(3)->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        SharedSeries::factory()->create([
            'account_type_ids' => $sharedAccountTypes->pluck('id')->toArray(),
            'num_format_id' => $format->id,
            'num_start' => 1,
            'priority' => false
        ]);

        $series1 = Series::generate($accountType, false);
        $series2 = Series::generate($sharedAccountTypes[0], true);
        $series3 = Series::generate($accountType, false);
        $series4 = Series::generate($sharedAccountTypes[1], true);
        $series5 = Series::generate($accountType, false);
        $series6 = Series::generate($sharedAccountTypes[2], true);

        $this->assertEquals([1, 2, 3], [$series2->num, $series4->num, $series6->num]);
        $this->assertEquals([
            sprintf($exp, 1), sprintf($exp, 2), sprintf($exp, 3)],
            [$series2->num_fulltext, $series4->num_fulltext, $series6->num_fulltext]
        );
    }

    public function test_regular_shared_series_separate_series_are_correct(): void
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

        $sharedAccountTypes = AccountType::factory()->count(3)->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        SharedSeries::factory()->create([
            'account_type_ids' => $sharedAccountTypes->pluck('id')->toArray(),
            'num_format_id' => $format->id,
            'num_start' => 1,
            'priority' => false
        ]);

        $this->seed(\Database\Seeders\GlobalConfigSeeder::class);

        Config::where('name', 'Priority Series Separate')
            ->update([
                'value' => true,
            ]);


        $series1 = Series::generate($accountType, false);
        $series2 = Series::generate($sharedAccountTypes[0], false);
        $series3 = Series::generate($sharedAccountTypes[0], true);
        $series4 = Series::generate($accountType, false);
        $series5 = Series::generate($sharedAccountTypes[1], false);
        $series6 = Series::generate($sharedAccountTypes[1], true);
        $series7 = Series::generate($accountType, false);
        $series8 = Series::generate($sharedAccountTypes[2], false);

        $this->assertEquals([1, 2, 3], [$series2->num, $series5->num, $series8->num]);
        $this->assertEquals([
            sprintf($exp, 1), sprintf($exp, 2), sprintf($exp, 3)],
            [$series2->num_fulltext, $series5->num_fulltext, $series8->num_fulltext]
        );
    }

    public function test_priority_shared_series_separate_series_are_correct(): void
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

        $sharedAccountTypes = AccountType::factory()->count(3)->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        SharedSeries::factory()->create([
            'account_type_ids' => $sharedAccountTypes->pluck('id')->toArray(),
            'num_format_id' => $format->id,
            'num_start' => 1,
            'priority' => false
        ]);

        $this->seed(\Database\Seeders\GlobalConfigSeeder::class);

        Config::where('name', 'Priority Series Separate')
            ->update([
                'value' => true,
            ]);


        $series1 = Series::generate($accountType, false);
        $series2 = Series::generate($sharedAccountTypes[0], false);
        $series3 = Series::generate($sharedAccountTypes[0], true);
        $series4 = Series::generate($accountType, false);
        $series5 = Series::generate($sharedAccountTypes[1], false);
        $series6 = Series::generate($sharedAccountTypes[1], true);
        $series7 = Series::generate($accountType, false);
        $series8 = Series::generate($sharedAccountTypes[2], false);
        $series9 = Series::generate($sharedAccountTypes[2], true);

        $this->assertEquals([1, 2, 3], [$series3->num, $series6->num, $series9->num]);
        $this->assertEquals([
            sprintf($exp, 1), sprintf($exp, 2), sprintf($exp, 3)],
            [$series3->num_fulltext, $series6->num_fulltext, $series9->num_fulltext]
        );
    }

    public function test_regular_shared_series_continues_series_are_correct(): void
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

        $sharedAccountTypes = AccountType::factory()->count(3)->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        SharedSeries::factory()->create([
            'account_type_ids' => $sharedAccountTypes->pluck('id')->toArray(),
            'num_format_id' => $format->id,
            'num_start' => 1,
            'priority' => false
        ]);

        $this->seed(\Database\Seeders\GlobalConfigSeeder::class);

        Config::where('name', 'Priority Series Separate')
            ->update([
                'value' => false,
            ]);


        $series1 = Series::generate($accountType, false);
        $series2 = Series::generate($sharedAccountTypes[0], false);
        $series3 = Series::generate($sharedAccountTypes[0], true);
        $series4 = Series::generate($accountType, false);
        $series5 = Series::generate($sharedAccountTypes[1], false);
        $series6 = Series::generate($sharedAccountTypes[1], true);
        $series7 = Series::generate($accountType, false);
        $series8 = Series::generate($sharedAccountTypes[2], false);

        $this->assertEquals([1, 3, 5], [$series2->num, $series5->num, $series8->num]);
        $this->assertEquals([
            sprintf($exp, 1), sprintf($exp, 3), sprintf($exp, 5)],
            [$series2->num_fulltext, $series5->num_fulltext, $series8->num_fulltext]
        );
    }

    public function test_priority_shared_series_continues_series_are_correct(): void
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

        $sharedAccountTypes = AccountType::factory()->count(3)->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        SharedSeries::factory()->create([
            'account_type_ids' => $sharedAccountTypes->pluck('id')->toArray(),
            'num_format_id' => $format->id,
            'num_start' => 1,
            'priority' => false
        ]);

        $this->seed(\Database\Seeders\GlobalConfigSeeder::class);

        Config::where('name', 'Priority Series Separate')
            ->update([
                'value' => false,
            ]);


        $series1 = Series::generate($accountType, false);
        $series2 = Series::generate($sharedAccountTypes[0], false);
        $series3 = Series::generate($sharedAccountTypes[0], true);
        $series4 = Series::generate($accountType, false);
        $series5 = Series::generate($sharedAccountTypes[1], false);
        $series6 = Series::generate($sharedAccountTypes[1], true);
        $series7 = Series::generate($accountType, false);
        $series8 = Series::generate($sharedAccountTypes[2], false);
        $series9 = Series::generate($sharedAccountTypes[2], true);

        $this->assertEquals([2, 4, 6], [$series3->num, $series6->num, $series9->num]);
        $this->assertEquals([
            sprintf($exp, 2), sprintf($exp, 4), sprintf($exp, 6)],
            [$series3->num_fulltext, $series6->num_fulltext, $series9->num_fulltext]
        );
    }

    public function test_priority_only_priority_shared_series_separate_series_are_correct(): void
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

        $sharedAccountTypes = AccountType::factory()->count(3)->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        SharedSeries::factory()->create([
            'account_type_ids' => $sharedAccountTypes->pluck('id')->toArray(),
            'num_format_id' => $format->id,
            'num_start' => 100,
            'priority' => true
        ]);
        // A dummy to make a test for priority only shared series
        SharedSeries::factory()->create([
            'account_type_ids' => $sharedAccountTypes->pluck('id')->toArray(),
            'num_format_id' => $format->id,
            'num_start' => 1,
            'priority' => false
        ]);

        $this->seed(\Database\Seeders\GlobalConfigSeeder::class);

        Config::where('name', 'Priority Series Separate')
            ->update([
                'value' => true,
            ]);


        $series1 = Series::generate($accountType, false);
        $series2 = Series::generate($sharedAccountTypes[0], false); // 100
        $series3 = Series::generate($sharedAccountTypes[0], true); // 100
        $series4 = Series::generate($accountType, false);
        $series5 = Series::generate($sharedAccountTypes[1], false); // 101
        $series6 = Series::generate($sharedAccountTypes[1], true); // 101
        $series7 = Series::generate($accountType, false);
        $series8 = Series::generate($sharedAccountTypes[2], false); // 102
        $series9 = Series::generate($sharedAccountTypes[2], true); // 102

        $this->assertEquals([100, 101, 102], [$series3->num, $series6->num, $series9->num]);
        $this->assertEquals([
            sprintf($exp, 100), sprintf($exp, 101), sprintf($exp, 102)],
            [$series3->num_fulltext, $series6->num_fulltext, $series9->num_fulltext]
        );
    }

    /**
     * Even the the series is continues but the shared series are for priority only,
     * the formatting and series numbers will continue the priority shared series numbers
     */
    public function test_priority_only_priority_shared_series_continues_series_are_correct(): void
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

        $sharedAccountTypes = AccountType::factory()->count(3)->create([
            'num_format_id' => $format->id,
            'num_start' => 1,
        ]);

        SharedSeries::factory()->create([
            'account_type_ids' => $sharedAccountTypes->pluck('id')->toArray(),
            'num_format_id' => $format->id,
            'num_start' => 100,
            'priority' => true
        ]);
        // A dummy to make a test for priority only shared series
        SharedSeries::factory()->create([
            'account_type_ids' => $sharedAccountTypes->pluck('id')->toArray(),
            'num_format_id' => $format->id,
            'num_start' => 1,
            'priority' => false
        ]);

        $this->seed(\Database\Seeders\GlobalConfigSeeder::class);

        Config::where('name', 'Priority Series Separate')
            ->update([
                'value' => false,
            ]);


        $series1 = Series::generate($accountType, false);
        $series2 = Series::generate($sharedAccountTypes[0], false); // 100
        $series3 = Series::generate($sharedAccountTypes[0], true); // 100
        $series4 = Series::generate($accountType, false);
        $series5 = Series::generate($sharedAccountTypes[1], false); // 102
        $series6 = Series::generate($sharedAccountTypes[1], true); // 101
        $series7 = Series::generate($accountType, false);
        $series8 = Series::generate($sharedAccountTypes[2], false); // 104
        $series9 = Series::generate($sharedAccountTypes[2], true); // 102

        $this->assertEquals([100, 101, 102], [$series3->num, $series6->num, $series9->num]);
        $this->assertEquals([
            sprintf($exp, 100), sprintf($exp, 101), sprintf($exp, 102)],
            [$series3->num_fulltext, $series6->num_fulltext, $series9->num_fulltext]
        );
    }
}
