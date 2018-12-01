<?php

namespace App\Request;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use App\Validator\Constraints as CarAssert;

class CarRequest
{
    /**
     * @Assert\NotNull()
     * @CarAssert\CarExists()
     */
    public $carId;

    /**
     * AddInspectionRequest constructor.
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $reservation = $request->getContent('reservation');
        $reservation = json_decode($reservation)->reservation;

        $this->carId = $reservation->carId;
    }
}
