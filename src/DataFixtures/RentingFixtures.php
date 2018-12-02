<?php

namespace App\DataFixtures;

use App\Entity\Car;
use App\Entity\Renting;
use App\Utils\Utils;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class RentingFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $path = 'public/data/Rentings.csv';
        $data = Utils::getData($path);

        foreach ($data as $index => $rentingData) {
            $renting = $this->createRenting($rentingData, $index);
            $manager->persist($renting);
        }

        $manager->flush();
    }

    private function createRenting(array $data, int $index): Renting
    {
        $renting = new Renting();

        /** @var Car $car */
        $car = $this->getReference('car:' . $data[0]);
        $renting->setCar($car);

        $date = new \DateTime();
        $date->modify($data[1]);
        $date->modify($data[2]);
        $renting->setRentedFrom($date);

        $date = new \DateTime();
        $date->modify($data[3]);
        $date->modify($data[4]);
        $renting->setRentedUntil($date);

        return $renting;
    }

    public function getDependencies()
    {
        return [
            CarFixtures::class,
        ];
    }
}
