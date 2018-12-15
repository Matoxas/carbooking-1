<?php

namespace App\Repository;

use App\Entity\Car;
use App\Entity\Renting;
use App\Entity\Subscriber;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Subscriber|null find($id, $lockMode = null, $lockVersion = null)
 * @method Subscriber|null findOneBy(array $criteria, array $orderBy = null)
 * @method Subscriber[]    findAll()
 * @method Subscriber[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SubscriberRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Subscriber::class);
    }

    public function findFilteredSubscribers(Car $car, Renting $renting)
    {
        $queryBuilder = $this->createQueryBuilder('s')
            ->select('s.email')
            ->andWhere('s.priceFrom >= :carPrice')
            ->setParameter('carPrice', $car->getPrice())
            ->andWhere('s.priceUntil <= :carPrice')
            ->setParameter('carPrice', $car->getPrice())
        ;

        $this->filters($queryBuilder, $car);
        $this->dateFilters($queryBuilder, $renting);

        return $queryBuilder->getQuery()
            ->execute();
    }

    private function filters(\Doctrine\ORM\QueryBuilder $queryBuilder, Car $car)
    {
        $queryBuilder->andWhere('s.priceFrom >= :carPrice')
            ->setParameter('carPrice', $car->getPrice());
        ;

        $queryBuilder->andWhere('s.priceUntil <= :carPrice')
            ->setParameter('carPrice', $car->getPrice());
        ;

        $queryBuilder->andWhere('s.city IS NULL')
            ->orWhere('s.city = :carCity')
            ->setParameter('carCity', $car->getCity()->getId())
        ;

        $queryBuilder->andWhere('s.brand IS NULL')
            ->orWhere('s.brand = :carBrand')
            ->setParameter('carBrand', $car->getBrand()->getId())
        ;

        $queryBuilder->andWhere('s.model IS NULL')
            ->orWhere('s.model = :carModel')
            ->setParameter('carModel', $car->getModel()->getId())
        ;
    }

    private function dateFilters(\Doctrine\ORM\QueryBuilder $queryBuilder, Renting $renting)
    {
        $queryBuilder->andWhere('s.dateFrom IS NULL')
            ->orWhere('s.dateFrom >= :rentingDateFrom')
            ->setParameter('rentingDateFrom', $renting->getRentedFrom()->format('Y-m-d'))
        ;

        $queryBuilder->andWhere('s.dateUntil IS NULL')
            ->orWhere('s.dateUntil <= :rentingDateUntil')
            ->setParameter('rentingDateUntil', $renting->getRentedUntil()->format('Y-m-d'))
        ;

        return true;
    }
}
