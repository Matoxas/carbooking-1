<?php

namespace App\DataFixtures;

use App\Entity\Brand;
use App\Entity\Car;
use App\Entity\City;
use App\Entity\Model;
use App\Entity\RentDate;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    private const USERS = [
        [
            'email' => 'xgelytex@gmail.com',
        ],
        [
            'email' => 'programeriss@gmail.com',
        ],
        [
            'email' => 'svogunelis.labaiilgas@gmail.com',
        ],
    ];

    private const BRANDSMODELS = [
        'BMW' => [
            'f10',
            'x6',
            'x5',
            'x3',
        ],
        'Audi' => [
            'A8',
            'S8',
            'A6',
            'A3',
        ],
        'Volswagen' => [
            'Golf',
            'Golf Plus',
            'Passat',
        ],
        'Škoda' => [
            'Fabia',
        ],
    ];

    private const CITIES = [
        'Vilnius',
        'Kaunas',
        'Klaipėda',
        'Šiauliai',
        'Panevėžys',
        'Akmenė',
        'Alytus',
        'Anykščiai',
        'Birštonas',
        'Biržai',
        'Druskininkai',
        'Elektrėnai',
        'Gargždai',
        'Ignalina',
        'Jonava',
        'Joniškis',
        'Jurbarkas',
        'Kaišiadorys',
        'Kalvarija',
        'Kazlų Rūda',
        'Kėdainiai',
        'Kelmė',
        'Krekenava',
        'Kretinga',
        'Kupiškis',
        'Kuršėnai',
        'Lazdijai',
        'Lentvaris',
        'Marijampolė',
        'Mažeikiai',
        'Molėtai',
        'Naujoji Akmenė',
        'Neringa',
        'Pagėgiai',
        'Pakruojis',
        'Palanga',
        'Pasvalys',
        'Plungė',
        'Prienai',
        'Radviliškis',
        'Raseiniai',
        'Rietavas',
        'Rokiškis',
        'Šakiai',
        'Šalčininkai',
        'Šilalė',
        'Šilutė',
        'Širvintos',
        'Skuodas',
        'Švenčionys',
        'Tauragė',
        'Telšiai',
        'Trakai',
        'Ukmergė',
        'Utena',
        'Varėna',
        'Vievis',
        'Vilkaviškis',
        'Visaginas',
        'Zarasai'
    ];

    public function load(ObjectManager $manager)
    {
        $this->loadCities($manager);
        $this->loadBrandAndModels($manager);
        $this->loadUsers($manager);
        $this->loadCars($manager);
        $this->loadRentDates($manager);
    }

    private function loadCities(ObjectManager $manager)
    {
        foreach (self::CITIES as $cityData) {
            $city = new City();
            $city->setCity($cityData);

            $this->addReference(
                $cityData,
                $city
            );

            $manager->persist($city);
        }

        $manager->flush();
    }

    private function loadBrandAndModels(ObjectManager $manager)
    {
        foreach (self::BRANDSMODELS as $brandData => $modelData) {
            $brand = new Brand();
            $brand->setBrand($brandData);

            $this->addReference(
                $brandData,
                $brand
            );

            $manager->persist($brand);

            for ($i = 0; $i < count($modelData); $i++) {
                $model = new Model();
                $model->setModel(
                    $modelData[$i]
                );
                $model->setBrand($brand);

                $this->addReference(
                    'model:' . $modelData[$i],
                    $model
                );

                $manager->persist($model);
            }
        }

        $manager->flush();
    }

    private function loadUsers(ObjectManager $manager)
    {
        foreach (self::USERS as $userData) {
            $user = new User();
            $user->setEmail($userData['email']);

            $this->addReference(
                $userData['email'],
                $user
            );

            $manager->persist($user);
        }

        $manager->flush();
    }

    private function loadRentDates(ObjectManager $manager)
    {
        for ($i = 0; $i < 10; $i++) {
            $rentDate = new RentDate();
            $date = new \DateTime();
            $date->modify('-' . rand(10, 20) . ' day');
            $rentDate->setRentedFrom($date);
            $date = new \DateTime();
            $date->modify('-' . rand(0, 9) . ' day');
            $rentDate->setRentedUntil($date);
            $rentDate->setCar($this->getReference(
                'car' . rand(0, 4)
            ));

            $manager->persist($rentDate);
        }

        $manager->flush();
    }

    private function loadCars(ObjectManager $manager)
    {
        $brands = [];
        $models = [];
        foreach (self::BRANDSMODELS as $brandData => $modelsData) {
            array_push($brands, $brandData);

            foreach ($modelsData as $modelData) {
                array_push($models, $modelData);
            }
        }

        for ($i = 0; $i < 50; $i++) {
            $car = new Car();
            $date = new \DateTime();
            $date->modify('-' . rand(0, 20) . ' day');
            $car->setCreatedAt($date);
            /** @var City $city */
            $city = $this->getReference(self::CITIES[rand(0, count(self::CITIES) - 1)]);
            $car->setCity($city);
            $car->setPhone('60000000');
            $car->setPrice(number_format(rand(10, 99) / 5, 2));
            $car->setUser($this->getReference(
                self::USERS[rand(0, count(self::USERS) - 1)]['email']
            ));
            /** @var Brand $brand */
            $brand = $this->getReference($brands[rand(0, count($brands) - 1)]);
            $car->setBrand($brand);

            /** @var Model $model */
            $model = $this->getReference('model:' . $models[rand(0, count($models) - 1)]);
            $car->setModel($model);

            $this->addReference(
                'car' . $i,
                $car
            );

            $manager->persist($car);
        }

        $manager->flush();
    }
}
