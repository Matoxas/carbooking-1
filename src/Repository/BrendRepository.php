<?php

namespace App\Repository;

use App\Entity\Brend;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Brend|null find($id, $lockMode = null, $lockVersion = null)
 * @method Brend|null findOneBy(array $criteria, array $orderBy = null)
 * @method Brend[]    findAll()
 * @method Brend[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BrendRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Brend::class);
    }

    // /**
    //  * @return Brend[] Returns an array of Brend objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Brend
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
