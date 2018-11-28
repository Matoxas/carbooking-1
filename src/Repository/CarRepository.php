<?php

namespace App\Repository;

use App\Entity\Car;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Car|null find($id, $lockMode = null, $lockVersion = null)
 * @method Car|null findOneBy(array $criteria, array $orderBy = null)
 * @method Car[]    findAll()
 * @method Car[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CarRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Car::class);
    }

    public function findCars()
    {
        return $this->createQueryBuilder('car')
            ->select(
                'car.id',
                'car.price',
                'car.createdAt',
                'car.address',
                'car.latitude',
                'car.longitude'
            )
            ->addSelect('city.city', 'user.email')
            ->addSelect('brand.brand')
            ->addSelect('model.model')
            ->innerJoin('car.city', 'city')
            ->innerJoin('car.user', 'user')
            ->innerJoin('car.brand', 'brand')
            ->innerJoin('car.model', 'model')
            ->getQuery()
            ->getArrayResult();
    }

    public function findCarById($carId)
    {
        return $this->createQueryBuilder('car')
            ->select(
                'car.id',
                'car.price',
                'car.createdAt',
                'car.address',
                'car.latitude',
                'car.longitude'
            )
            ->addSelect('city.city', 'user.email')
            ->addSelect('brand.brand')
            ->addSelect('model.model')
            ->innerJoin('car.city', 'city')
            ->innerJoin('car.user', 'user')
            ->innerJoin('car.brand', 'brand')
            ->innerJoin('car.model', 'model')
            ->where('car.id = :carId')
            ->setParameter('carId', $carId)
            ->getQuery()
            ->getSingleResult();
    }

    public function fetchFilteredCars($params)
    {
        $qb = $this->createQueryBuilder('car')
            ->select(
                'car.id',
                'car.price',
                'car.createdAt',
                'car.address',
                'car.latitude',
                'car.longitude'
            )
            ->addSelect('city.city', 'user.email')
            ->addSelect('brand.brand')
            ->addSelect('model.model')
            ->innerJoin('car.city', 'city')
            ->innerJoin('car.user', 'user')
            ->innerJoin('car.brand', 'brand')
            ->innerJoin('car.model', 'model');

        if (isset($params['location']) && $params['location'] != "") {
            $qb->andWhere('city.id = :cityId')
                ->setParameter('cityId', $params['location']);
        }

        return $qb->getQuery()
            ->getArrayResult();
    }
}
