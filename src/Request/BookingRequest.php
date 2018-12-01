<?php

namespace App\Request;

use App\Entity\Booking;
use Symfony\Component\Validator\Constraints as Assert;

class BookingRequest extends Booking
{
    public function __construct(\stdClass $reservation)
    {
        $this->setCar($reservation->carId);
    }
}
