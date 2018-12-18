<?php

namespace App\Twig;

use App\Entity\Car;
use Doctrine\ORM\EntityManagerInterface;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;

class CarExtension extends AbstractExtension
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * CarExtension constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @return array
     */
    public function getFilters(): array
    {
        return [
            new TwigFilter('ninePlus', [$this, 'ninePlus']),
        ];
    }

    /**
     * @return array
     */
    public function getFunctions(): array
    {
        return [
            new TwigFunction('notConfirmedCarsCount', [$this, 'notConfirmedCarsCount']),
            new TwigFunction('notPublishedCarsCount', [$this, 'notPublishedCarsCount']),
        ];
    }

    /**
     * @param $carsCount
     * @return string
     */
    public function ninePlus($carsCount)
    {
        if ($carsCount > 9) {
            return '9+';
        }

        return $carsCount;
    }

    /**
     * @return int|void
     */
    public function notConfirmedCarsCount()
    {
        $cars = $this->entityManager->getRepository(Car::class)
            ->findBy(['confirmed' => false]);

        $count = count($cars);

        return $count;
    }

    /**
     * @return int|void
     */
    public function notPublishedCarsCount()
    {
        $cars = $this->entityManager->getRepository(Car::class)
            ->findBy(['publish' => false]);

        $count = count($cars);

        return $count;
    }
}
