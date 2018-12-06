<?php

namespace App\Tests;

use App\Security\TokenGenerator;
use PHPUnit\Framework\TestCase;

class TokenGeneratorTest extends TestCase
{
    /**
     * @param int $expected
     * @param $length
     * @dataProvider getTokenGeneratorDataProvider
     */
    public function testGetRandomSecureTokenFale(int $expected, $length): void
    {
        $tokenGenerator = new TokenGenerator();

        $this->assertNotSame($expected, strlen($tokenGenerator->getRandomSecureToken($length)));
    }

    public function getTokenGeneratorDataProvider()
    {
        return [
            [10, 8],
            [15, 5],
            [30, 40]
        ];
    }

    public function testGetRandomSecureTokenSuccess(): void
    {
        $value = 5;

        $tokenGenerator = new TokenGenerator();

        $this->assertSame($value, strlen($tokenGenerator->getRandomSecureToken($value)));
    }
}
