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
}
