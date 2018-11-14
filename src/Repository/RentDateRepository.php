<?php

namespace App\Repository;

use App\Entity\RentDate;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method RentDate|null find($id, $lockMode = null, $lockVersion = null)
 * @method RentDate|null findOneBy(array $criteria, array $orderBy = null)
 * @method RentDate[]    findAll()
 * @method RentDate[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RentDateRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, RentDate::class);
    }

    public function findRentDatesByCarId($carId)
    {
        return $this->createQueryBuilder('rd')
            ->select('rd.rentedFrom', 'rd.rentedUntil')
            ->where('rd.car = :carId')
            ->setParameter('carId', $carId)
            ->getQuery()
            ->execute();
    }
}
