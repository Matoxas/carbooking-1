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
}
