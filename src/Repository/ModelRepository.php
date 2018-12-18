<?php

namespace App\Repository;

use App\Entity\Model;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Model|null find($id, $lockMode = null, $lockVersion = null)
 * @method Model|null findOneBy(array $criteria, array $orderBy = null)
 * @method Model[]    findAll()
 * @method Model[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ModelRepository extends ServiceEntityRepository
{
    /**
     * ModelRepository constructor.
     * @param RegistryInterface $registry
     */
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Model::class);
    }

    /**
     * @param int $brandId
     * @return mixed
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findCountOfRecords(int $brandId)
    {
        return $this->createQueryBuilder('m')
            ->select('COUNT(m.id)')
            ->where('m.brand = :brandId')
            ->setParameter('brandId', $brandId)
            ->getQuery()
            ->getSingleScalarResult();
    }
}
