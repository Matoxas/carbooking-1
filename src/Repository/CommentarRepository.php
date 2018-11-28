<?php

namespace App\Repository;

use App\Entity\Commentar;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Commentar|null find($id, $lockMode = null, $lockVersion = null)
 * @method Commentar|null findOneBy(array $criteria, array $orderBy = null)
 * @method Commentar[]    findAll()
 * @method Commentar[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CommentarRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Commentar::class);
    }

    // /**
    //  * @return Commentar[] Returns an array of Commentar objects
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
    public function findOneBySomeField($value): ?Commentar
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
