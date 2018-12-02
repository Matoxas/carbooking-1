<?php

namespace App\DataFixtures;

use App\Entity\City;
use App\Utils\Utils;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class CityFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $path = 'public/data/Cities.csv';
        $data = Utils::getData($path);

        foreach ($data as $index => $cityData) {
            $city = $this->createCity($cityData, $index);
            $manager->persist($city);
        }

        $manager->flush();
    }

    private function createCity(array $data, int $index): City
    {
        $city = new City();

        $city->setCity($data[0]);

        $this->addReference(
            'city:' . $index,
            $city
        );

        return $city;
    }
}
