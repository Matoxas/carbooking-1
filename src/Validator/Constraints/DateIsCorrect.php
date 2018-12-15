<?php

namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 * @Target({"CLASS"})
 */
class DateIsCorrect extends Constraint
{
    /**
     * @var string
     */
    public $message = 'date.not.correct';

    /**
     * {@inheritdoc}
     */
    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }

    /**
     * {@inheritdoc}
     */
    public function validatedBy(): string
    {
        return DateIsCorrectValidator::class;
    }
}
