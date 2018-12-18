<?php

namespace App\Repository;

use App\Entity\City;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method City|null find($id, $lockMode = null, $lockVersion = null)
 * @method City|null findOneBy(array $criteria, array $orderBy = null)
 * @method City[]    findAll()
 * @method City[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CityRepository extends ServiceEntityRepository
{
    /**
     * CityRepository constructor.
     * @param RegistryInterface $registry
     */
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, City::class);
    }

    /**
     * @return array
     */
    public function findAllCitiesWithCars()
    {
        return $this->createQueryBuilder('c')
            ->select('c.id', 'c.city')
            ->innerJoin('c.cars', 'cars')
            ->innerJoin('cars.city', 'city')
            ->where('city.id = c.id')
            ->andWhere('cars.publish = true')
            ->groupBy('city.id')
            ->getQuery()
            ->getArrayResult();
    }
}
