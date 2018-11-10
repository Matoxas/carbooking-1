<?php

namespace App\DataFixtures;

use App\Entity\Brand;
use App\Entity\City;
use App\Entity\Model;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    private const BRANDMODEL = [
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
        "Vilnius",
        "Kaunas",
        "Klaipėda",
        "Šiauliai",
        "Panevėžys",
        "Akmenė",
        "Alytus",
        "Anykščiai",
        "Birštonas",
        "Biržai",
        "Druskininkai",
        "Elektrėnai",
        "Gargždai",
        "Ignalina",
        "Jonava",
        "Joniškis",
        "Jurbarkas",
        "Kaišiadorys",
        "Kalvarija",
        "Kazlų Rūda",
        "Kėdainiai",
        "Kelmė",
        "Krekenava",
        "Kretinga",
        "Kupiškis",
        "Kuršėnai",
        "Lazdijai",
        "Lentvaris",
        "Marijampolė",
        "Mažeikiai",
        "Molėtai",
        "Naujoji Akmenė",
        "Neringa",
        "Pagėgiai",
        "Pakruojis",
        "Palanga",
        "Pasvalys",
        "Plungė",
        "Prienai",
        "Radviliškis",
        "Raseiniai",
        "Rietavas",
        "Rokiškis",
        "Šakiai",
        "Šalčininkai",
        "Šilalė",
        "Šilutė",
        "Širvintos",
        "Skuodas",
        "Švenčionys",
        "Tauragė",
        "Telšiai",
        "Trakai",
        "Ukmergė",
        "Utena",
        "Varėna",
        "Vievis",
        "Vilkaviškis",
        "Visaginas",
        "Zarasai"
    ];

    public function load(ObjectManager $manager)
    {
        $this->loadCities($manager);
        $this->loadBrandAndModels($manager);
    }

    private function loadCities(ObjectManager $manager)
    {
        foreach (self::CITIES as $value) {
            $city = new City();
            $city->setCity($value);

            $manager->persist($city);
        }

        $manager->flush();
    }

    private function loadBrandAndModels(ObjectManager $manager)
    {
        foreach (self::BRANDMODEL as $key => $value) {
            $brand = new Brand();
            $brand->setBrand($key);

            $manager->persist($brand);
            $manager->flush();

            for ($i = 0; $i < count($value) - 1; $i++) {
                $model = new Model();
                $model->setModel(
                    $value[rand(0, count($value) - 1)]
                );
                $model->setBrand($brand->getId());

                $manager->persist($model);
            }
        }

        $manager->flush();
    }
}
