<?php

namespace App\Service;

use App\Repository\RentingRepository;

class RentingService
{
    /**
     * @var RentingRepository
     */
    private $rentingRepository;

    /**
     * RentingService constructor.
     * @param RentingRepository $rentingRepository
     */
    public function __construct(RentingRepository $rentingRepository)
    {
        $this->rentingRepository = $rentingRepository;
    }

    public function isTimeAvailable(int $carId, \DateTime $from, \DateTime $until): bool
    {
        $dates = $this->rentingRepository->findBy(['car' => $carId]);

        foreach ($dates as $date) {
            if ($from >= $date->getRentedFrom() && $from <= $date->getRentedUntil()) {
                return true;
            }

            if ($until >= $date->getRentedFrom() && $until <= $date->getRentedUntil()) {
                return true;
            }

            if ($date->getRentedFrom() >= $from && $date->getRentedFrom() <= $until) {
                return true;
            }

            if ($date->getRentedUntil() >= $from && $date->getRentedUntil() <= $until) {
                return true;
            }
        }

        return false;
    }
}
