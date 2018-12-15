<?php

namespace App\Service;

use App\Repository\BookingRepository;

class BookingService
{
    /**
     * @var BookingRepository
     */
    private $bookingRepository;

    /**
     * BookingService constructor.
     * @param BookingRepository $bookingRepository
     */
    public function __construct(BookingRepository $bookingRepository)
    {
        $this->bookingRepository = $bookingRepository;
    }

    public function isTimeReserved(int $carId, \DateTime $from, \DateTime $until): bool
    {
        $dates = $this->bookingRepository->findBy(['car' => $carId, 'approved' => true]);

        foreach ($dates as $date) {
            if ($from >= $date->getBookedFrom() && $from <= $date->getBookedUntil()) {
                return true;
            }

            if ($until >= $date->getBookedFrom() && $until <= $date->getBookedUntil()) {
                return true;
            }

            if ($date->getBookedFrom() >= $from && $date->getBookedFrom() <= $until) {
                return true;
            }

            if ($date->getBookedUntil() >= $from && $date->getBookedUntil() <= $until) {
                return true;
            }
        }

        return false;
    }

    public function isValidDate(\DateTime $from, \DateTime $until): bool
    {
        $dateFrom = $from->format("Y-m-d H:i:s");
        $dateUntil = $until->format("Y-m-d H:i:s");
        if ($dateFrom >= $dateUntil) {
            return false;
        }

        return true;
    }
}
