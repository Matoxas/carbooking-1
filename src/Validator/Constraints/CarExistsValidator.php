<?php

namespace App\Validator\Constraints;

use App\Entity\Car;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;

class CarExistsValidator extends ConstraintValidator
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * CarExistsValidator constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function validate($carId, Constraint $constraint): void
    {
        if (!$constraint instanceof CarExists) {
            throw new UnexpectedTypeException($constraint, CarExists::class);
        }

        if (!is_int($carId)) {
            throw new UnexpectedTypeException($carId, 'int');
        }

        $repository = $this->entityManager->getRepository(Car::class);

        if (null === $repository->findOneBy(['id' => $carId])) {
            $this->context->buildViolation($constraint->message)
                ->addViolation();
        }
    }


}
