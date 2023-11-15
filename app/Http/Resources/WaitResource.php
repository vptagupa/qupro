<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WaitResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        return [
            'waiting' => $data['waiting'],
            'total_priorities' => $data['priority'],
            'total_regulars' => $data['regular'],
        ];
    }

    /**
     * Get additional data that should be returned with the resource array.
     *
     * @return array<string, mixed>
     */
    public function with(Request $request): array
    {
        return [
            'meta' => [
                'has_next_priority' => $this->resource['waiting']->collection->filter(fn($q) => $q->priority)->count() > 0,
                'has_next_regular' => $this->resource['waiting']->collection->filter(fn($q) => !$q->priority)->count() > 0,
            ],
        ];
    }
}
