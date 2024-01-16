<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AccountTypeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data['statistics'] = $this->resource->statistics(
            \App\Models\Config::isEnabledCategories() && \Auth::check() ?
            \Auth::user()->categories($this->resource->account_type_id)->pluck('categories.id')->toArray()
            : null
        );

        return $data;
    }
}
