<?php

namespace App\Repository;

use App\Entity\CarAvailable;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method CarAvailable|null find($id, $lockMode = null, $lockVersion = null)
 * @method CarAvailable|null findOneBy(array $criteria, array $orderBy = null)
 * @method CarAvailable[]    findAll()
 * @method CarAvailable[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CarAvailableRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, CarAvailable::class);
    }

    // /**
    //  * @return CarAvailable[] Returns an array of CarAvailable objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CarAvailable
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
