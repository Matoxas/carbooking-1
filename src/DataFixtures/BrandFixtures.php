<?php

namespace App\DataFixtures;

use App\Entity\Brand;
use App\Utils\Utils;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class BrandFixtures extends Fixture
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $path = 'public/data/Brands.csv';
        $data = Utils::getData($path);

        foreach ($data as $index => $brandData) {
            $brand = $this->createBrand($brandData, $index);
            $manager->persist($brand);
        }

        $manager->flush();
    }

    /**
     * @param array $data
     * @param int $index
     * @return Brand
     */
    private function createBrand(array $data, int $index): Brand
    {
        $brand = new Brand();

        $brand->setBrand($data[0]);

        $this->addReference(
            'brand:' . $index,
            $brand
        );

        return $brand;
    }
}
