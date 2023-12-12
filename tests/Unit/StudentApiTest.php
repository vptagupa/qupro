<?php

namespace Tests\Unit;

use Tests\TestCase;

class StudentApiTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_api_status(): void
    {
        $response = $this->post('https://api.pcu.priisms.online/api/students-api/202233678');
        $response->assertStatus(200);
    }
}
