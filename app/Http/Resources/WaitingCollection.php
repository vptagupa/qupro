<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class WaitingCollection extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
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
                'has_next_priority' => $this->collection->filter(fn($qu) => $qu->priority)->count() > 0,
                'has_next_regular' => $this->collection->filter(fn($qu) => !$qu->priority)->count() > 0,
            ],
        ];
    }
}
