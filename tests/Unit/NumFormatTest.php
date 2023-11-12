<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\NumFormat;

class NumFormatTest extends TestCase
{
    /**
     * A test of full format expression
     */
    public function test_format_full_expression_with_n_left(): void
    {
        $format = NumFormat::factory()->count(1)->make([
            'title' => 'Format',
            'affix' => 'ALL',
            'delimiter' => '-',
            'format' => '{affix}{delimiter}{(5)series}',
            'active' => 1,
        ]);

        $format = $format->first()->fulltext(5);

        $this->assertEquals('ALL-00005', $format);
    }

    /**
     * A test of full format expression
     */
    public function test_format_full_expression_with_n_right(): void
    {
        $format = NumFormat::factory()->count(1)->make([
            'title' => 'Format',
            'affix' => 'ALL',
            'delimiter' => '-',
            'format' => '{affix}{delimiter}{series(5)}',
            'active' => 1,
        ]);

        $format = $format->first()->fulltext(5);

        $this->assertEquals('ALL-50000', $format);
    }

    /**
     * A test of series only
     */
    public function test_format_series_only(): void
    {
        $format = NumFormat::factory()->count(1)->make([
            'title' => 'Format',
            'affix' => '',
            'delimiter' => '',
            'format' => '{series}',
            'active' => 1,
        ]);

        $format = $format->first()->fulltext(5);

        $this->assertEquals('5', $format);
    }

    /**
     * A test of n and series only
     */
    public function test_format_n_and_series_only(): void
    {
        $format = NumFormat::factory()->count(1)->make([
            'title' => 'Format',
            'affix' => '',
            'delimiter' => '',
            'format' => '{(5)series}',
            'active' => 1,
        ]);

        $format = $format->first()->fulltext(5);

        $this->assertEquals('00005', $format);
    }

    /**
     * A test of delimiter, n, series format only
     */
    public function test_format_delimeter_n_and_series_only(): void
    {
        $format = NumFormat::factory()->count(1)->make([
            'title' => 'Format',
            'affix' => '',
            'delimiter' => '-',
            'format' => '{delimiter}{(5)series}',
            'active' => 1,
        ]);

        $format = $format->first()->fulltext(5);

        $this->assertEquals('-00005', $format);
    }

    /**
     * A test series and affix only
     */
    public function test_format_series_affix_only(): void
    {
        $format = NumFormat::factory()->count(1)->make([
            'title' => 'Format',
            'affix' => 'x',
            'delimiter' => '',
            'format' => '{affix}{series}',
            'active' => 1,
        ]);

        $format = $format->first()->fulltext(5);

        $this->assertEquals('x5', $format);
    }
}
