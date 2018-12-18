<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class DateIsInTheFutureValidator extends ConstraintValidator
{
    /**
     * @param mixed $date
     * @param Constraint $constraint
     * @throws \Exception
     */
    public function validate($date, Constraint $constraint): void
    {
        if (!$constraint instanceof DateIsInTheFuture) {
            throw new UnexpectedTypeException($constraint, DateIsInTheFuture::class);
        }

        if (!$date instanceof \DateTime) {
            throw new UnexpectedTypeException($date, \DateTime::class);
        }

        $now = new \DateTime();

        if ($now->format("Y-m-d") > $date->format("Y-m-d")) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }
}
