<?php

namespace App\Validator\Constraints;

use App\Entity\Booking;
use App\Entity\Renting;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class DateIsAvailableValidator extends ConstraintValidator
{
    /**
     * @param Booking $value
     * @param Constraint $constraint
     */
    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof DateIsAvailable) {
            throw new UnexpectedTypeException($constraint, DateIsAvailable::class);
        }

        if (!$value instanceof Booking) {
            throw new UnexpectedTypeException($value, Booking::class);
        }

        if (!$value->getBookedFrom() instanceof \DateTime) {
            throw new UnexpectedTypeException($value->getBookedFrom(), \DateTime::class);
        }

        if (!$value->getBookedUntil() instanceof \DateTime) {
            throw new UnexpectedTypeException($value->getBookedUntil(), \DateTime::class);
        }

        if (!$this->isDateAvailableForBooking($value) || !$this->isDateAvailableForRenting($value)) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }

    private function isDateAvailableForBooking(Booking $value): bool
    {
        $bookings = $value->getCar()->getBookings()->toArray();

        /** @var Booking $booking */
        foreach ($bookings as $booking) {
            if ($this->isDateReserved(
                $booking->getBookedFrom(),
                $booking->getBookedUntil(),
                $value->getBookedFrom(),
                $value->getBookedUntil()
            )) {
                return false;
            }
        }

        return true;
    }


    private function isDateAvailableForRenting(Booking $value): bool
    {
        $rentingArray = $value->getCar()->getRenting()->toArray();

        /** @var Renting $renting */
        foreach ($rentingArray as $renting) {
            if ($this->isDateReserved(
                $renting->getRentedFrom(),
                $renting->getRentedUntil(),
                $value->getBookedFrom(),
                $value->getBookedUntil()
            )) {
                return true;
            }
        }

        return false;
    }

    private function isDateReserved($from, $until, $fromDate, $untilDate): bool
    {
        if ($from >= $fromDate && $from <= $untilDate) {
            return true;
        }

        if ($until >= $fromDate && $until <= $untilDate) {
            return true;
        }

        if ($fromDate >= $from && $fromDate <= $until) {
            return true;
        }

        if ($untilDate >= $from && $untilDate <= $until) {
            return true;
        }

        return false;
    }
}
