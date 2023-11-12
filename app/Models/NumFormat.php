<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NumFormat extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'affix',
        'delimiter',
        'format',
        'active'
    ];

    protected $casts = [
        'active' => 'boolean'
    ];

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    public function fulltext(int $num)
    {
        $format = $this->format;
        if (preg_match('/\{\(\d\)series\}|\{series\(\d\)\}/', $format, $matches)) {

            preg_match('/\(\d\)/', $matches[0], $nmatch);
            $n = (int) str_replace(['(', ')'], '', $nmatch[0]);
            $format = preg_replace(
                '/\{\(\d\)series\}/',
                str_pad($num, $n, '0', STR_PAD_LEFT),
                $format
            );
            $format = preg_replace(
                '/\{series\(\d\)\}/',
                str_pad($num, $n, '0', STR_PAD_RIGHT),
                $format
            );
        }

        if (preg_match('/\{series\}/', $format, $matches)) {
            $format = preg_replace('/\{series\}/', $num, $format);
        }

        if ($this->affix) {
            $format = preg_replace('/\{affix\}/', $this->affix, $format);
        }
        if ($this->delimiter) {
            $format = preg_replace('/\{delimiter\}/', $this->delimiter, $format);
        }

        return $format;
    }
}
