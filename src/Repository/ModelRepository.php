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
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Model::class);
    }

    public function findAllModelsByBrand(int $brandId)
    {
        return $this->createQueryBuilder('m')
            ->select('m.id', 'm.model')
            ->innerJoin('m.brand', 'b')
            ->where('b.id = :brandId')
            ->setParameter('brandId', $brandId)
            ->orderBy('m.model', 'DESC')
            ->getQuery()
            ->getArrayResult();
    }
}
