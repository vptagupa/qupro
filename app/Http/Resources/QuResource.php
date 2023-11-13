<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuResource extends JsonResource
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
        $has_next_priority = false;
        $has_next_regular = false;

        if (isset($this->accountType)) {
            $has_next_priority = $this->accountType->waiting->filter(fn($q) => $q->priority)->count() > 0;
            $has_next_regular = $this->accountType->waiting->filter(fn($q) => !$q->priority)->count() > 0;
        }

        return [
            'meta' => [
                'has_next_priority' => $has_next_priority,
                'has_next_regular' => $has_next_regular,
            ],
        ];
    }
}
