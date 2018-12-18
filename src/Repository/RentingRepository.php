<?php

namespace App\Repository;

use App\Entity\Renting;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Renting|null find($id, $lockMode = null, $lockVersion = null)
 * @method Renting|null findOneBy(array $criteria, array $orderBy = null)
 * @method Renting[]    findAll()
 * @method Renting[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RentingRepository extends ServiceEntityRepository
{
    /**
     * RentingRepository constructor.
     * @param RegistryInterface $registry
     */
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Renting::class);
    }
}
