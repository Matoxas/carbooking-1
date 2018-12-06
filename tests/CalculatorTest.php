<?php

namespace App\Tests;

use App\Calculator\Calculator;
use PHPUnit\Framework\TestCase;

class CalculatorTest extends TestCase
{
    /**
     * @param int $expected
     * @param $firstNumber
     * @param $secondNumber
     * @dataProvider getSumDataProvider
     */
    public function testGetSum(int $expected, $firstNumber, $secondNumber): void
    {
        // I $this->markTestIncomplete('tekstas');
        // S $this->markTestSkipped('test');

        //VIENAS UNIT TESTAS!!! nusiust jam nuoroda i savo travis, kuriame matosi musu buildas... :_D
        $calculator = new Calculator();

        $this->assertEquals($expected, $calculator->getSum($firstNumber, $secondNumber));
    }

    public function getSumDataProvider()
    {
        return [
            [10, 5, 5],
            [15, 5, 10],
            [8, 8, false],
            [7, "wizard", '4']
        ];
    }
}
