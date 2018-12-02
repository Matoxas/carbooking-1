<?php

namespace App\Repository;

use App\Entity\Car;
use App\Entity\Renting;
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

    public function findCountOfFilteredCars(array $filters = null)
    {
        $filters['count'] = true;
        return $this->findFilterAndSortingCars($filters);
    }

    public function findFilterAndSortingCars(array $filters = null, int $startRecord = null, int $recordsPerPage = null)
    {
        $queryBuilder = $this->createQueryBuilder('car');

        if ($filters != null) {
            $this->filters($queryBuilder, $filters);
            $this->sorts($queryBuilder, $filters);
        }

        if (!empty($filters['count'])) {
            $queryBuilder->select('count(car.id)');

            return $queryBuilder->getQuery()
                ->getSingleScalarResult();
        }

        if ($startRecord !== null && $recordsPerPage !== null) {
            $this->paginations($queryBuilder, $startRecord, $recordsPerPage);
        }

        return $queryBuilder->getQuery()
            ->execute();
    }

    /**
     * @param \Doctrine\ORM\QueryBuilder $queryBuilder
     * @param $filters
     * @throws \Exception
     */
    private function filters(\Doctrine\ORM\QueryBuilder $queryBuilder, $filters): void
    {
        if (!empty($filters['location'])) {
            $queryBuilder->andWhere('car.city = :cityId')
                ->setParameter('cityId', $filters['location'])
            ;
        }

        if (!empty($filters['price_from']) && !empty($filters['price_until'])) {
            $queryBuilder->andWhere('car.price >= :price_from')
                ->setParameter('price_from', $filters['price_from'])
                ->andWhere('car.price <= :price_until')
                ->setParameter('price_until', $filters['price_until'])
            ;
        }

        if (!empty($filters['brand'])) {
            $queryBuilder->andWhere('car.brand = :brandId')
                ->setParameter('brandId', $filters['brand'])
            ;
        }

        if (!empty($filters['model'])) {
            $queryBuilder->andWhere('car.model = :modelId')
                ->setParameter('modelId', $filters['model'])
            ;
        }

        if (!empty($filters['date_from']) && !empty($filters['date_until'])) {
            $dateFrom = new \DateTime($filters['date_from']);
            $dateUntil = new \DateTime($filters['date_until']);

            $queryBuilder->join('car.renting', 'r')
                ->andWhere('r.rentedFrom <= :rentedFrom')
                ->andWhere('r.rentedUntil >= :rentedUntil')
                ->setParameter('rentedFrom', $dateFrom->format('Y-m-d H:i:s'))
                ->setParameter('rentedUntil', $dateUntil->format('Y-m-d H:i:s'))
            ;
        }
    }

    /**
     * @param \Doctrine\ORM\QueryBuilder $queryBuilder
     * @param $filters
     */
    private function sorts(\Doctrine\ORM\QueryBuilder $queryBuilder, $filters): void
    {
        if ($filters['sort'] == 'naujausi') {
            $queryBuilder->addOrderBy('car.createdAt', 'DESC');
        }

        if ($filters['sort'] == 'seniausi') {
            $queryBuilder->addOrderBy('car.createdAt', 'ASC');
        }

        if ($filters['sort'] == 'pigiausi') {
            $queryBuilder->addOrderBy('car.price', 'ASC');
        }

        if ($filters['sort'] == 'brangiausi') {
            $queryBuilder->addOrderBy('car.price', 'DESC');
        }
    }

    /**
     * @param \Doctrine\ORM\QueryBuilder $queryBuilder
     * @param int $startRecord
     * @param int $recordsPerPage
     */
    private function paginations(\Doctrine\ORM\QueryBuilder $queryBuilder, int $startRecord, int $recordsPerPage): void
    {
        $queryBuilder->setFirstResult($startRecord)
            ->setMaxResults($recordsPerPage)
        ;
    }
}
