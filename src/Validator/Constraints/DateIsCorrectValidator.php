<?php

namespace App\Validator\Constraints;

use App\Entity\Booking;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class DateIsCorrectValidator extends ConstraintValidator
{
    /**
     * @param Booking $value
     * @param Constraint $constraint
     */
    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof DateIsCorrect) {
            throw new UnexpectedTypeException($constraint, DateIsCorrect::class);
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

        if ($value->getBookedFrom()->format("Y-m-d") > $value->getBookedUntil()->format("Y-m-d")) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }
}
