<?php

namespace App\DataFixtures;

use App\Entity\Brand;
use App\Entity\Car;
use App\Entity\City;
use App\Entity\Model;
use App\Entity\User;
use App\Utils\Utils;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class CarFixtures extends Fixture implements DependentFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $path = 'public/data/Cars.csv';
        $data = Utils::getData($path);

        foreach ($data as $index => $carData) {
            $car = $this->createCar($carData, $index);
            $manager->persist($car);
        }

        $manager->flush();
    }

    /**
     * @param array $data
     * @param int $index
     * @return Car
     * @throws \Exception
     */
    private function createCar(array $data, int $index): Car
    {
        $car = new Car();

        $car->setPublish(true);
        $car->setConfirmed(true);
        $car->setPrice($data[0]);

        $date = new \DateTime();
        $date->modify($data[1]);
        $date->modify($data[2]);
        $car->setCreatedAt($date);

        /** @var City $city */
        $city = $this->getReference('city:' . $data[3]);
        $car->setCity($city);

        $car->setAddress($data[4]);
        $car->setLatitude($data[5]);
        $car->setLongitude($data[6]);

        /** @var Brand $user */
        $brand = $this->getReference('brand:' . $data[7]);
        $car->setBrand($brand);

        /** @var Model $user */
        $model = $this->getReference('model:' . $data[7] . '|' . $data[8]);
        $car->setModel($model);

        /** @var User $user */
        $user = $this->getReference('user:' . $data[9]);
        $car->setUser($user);

        $car->setDescription($data[10]);

        $this->addReference(
            'car:' . $index,
            $car
        );

        return $car;
    }

    /**
     * @return array
     */
    public function getDependencies()
    {
        return [
            BrandFixtures::class,
            ModelFixtures::class,
            CityFixtures::class,
            UserFixtures::class,
        ];
    }
}
