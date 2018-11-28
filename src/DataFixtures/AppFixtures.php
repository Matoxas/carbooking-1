<?php

namespace App\DataFixtures;

use App\Entity\Booking;
use App\Entity\Brand;
use App\Entity\Car;
use App\Entity\City;
use App\Entity\Image;
use App\Entity\Model;
use App\Entity\Renting;
use App\Entity\User;
use App\Utils\Utils;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    /**
     * @var array
     */
    private $cities;

    /**
     * @var array
     */
    private $brands;

    /**
     * @var array
     */
    private $models;

    /**
     * @var array
     */
    private $users;

    /**
     * @var array
     */
    private $cars;

    /**
     * @var Renting
     */
    private $renting;

    /**
     * @var Image
     */
    private $images;

    /**
     * @var Booking
     */
    private $bookings;

    /**
     * @var array
     */
    private $address;

    public function load(ObjectManager $manager)
    {
        $this->loadFiles();
        $this->loadCities($manager);
        $this->loadBrandAndModels($manager);
        $this->loadUsers($manager);
        $this->loadCars($manager);
        $this->loadRentings($manager);
        $this->loadImages($manager);
        $this->loadBookings($manager);
    }

    private function loadFiles()
    {
        $path = 'public/data/Cities.csv';
        $this->cities = Utils::getData($path);

        $path = 'public/data/Brands.csv';
        $this->brands = Utils::getData($path);

        $path = 'public/data/Models.csv';
        $this->models = Utils::getData($path);

        $path = 'public/data/Users.csv';
        $this->users = Utils::getData($path);

        $path = 'public/data/Cars.csv';
        $this->cars = Utils::getData($path);

        $path = 'public/data/Rentings.csv';
        $this->renting = Utils::getData($path);

        $path = 'public/data/Images.csv';
        $this->images = Utils::getData($path);

        $path = 'public/data/Bookings.csv';
        $this->bookings = Utils::getData($path);

        $path = 'public/data/Address.csv';
        $this->address = Utils::getData($path);
    }

    private function loadCities(ObjectManager $manager)
    {
        foreach ($this->cities as $cityData) {
            $city = new City();
            $city->setCity($cityData[0]);

            $this->addReference(
                'city:' . $cityData[0],
                $city
            );

            $manager->persist($city);
        }

        $manager->flush();
    }

    private function loadBrandAndModels(ObjectManager $manager)
    {

        for ($i = 0; $i < count($this->brands); $i++) {
            $brand = $this->loadBrand($manager, $this->brands[$i][0]);
            $this->loadModels($manager, $brand, $i);
        }

        $manager->flush();
    }

    private function loadBrand(ObjectManager $manager, $brandData): Brand
    {
        $brand = new Brand();
        $brand->setBrand($brandData);

        $this->addReference(
            'brand:' . $brandData,
            $brand
        );

        $manager->persist($brand);

        return $brand;
    }

    private function loadModels(ObjectManager $manager, Brand $brand, $listLine)
    {
        foreach ($this->models[$listLine] as $modelData) {
            $model = new Model();
            $model->setModel(
                $modelData
            );
            $model->setBrand($brand);

            $this->addReference(
                'model:' . $modelData,
                $model
            );

            $manager->persist($model);
        }
    }

    private function loadUsers(ObjectManager $manager)
    {
        for ($i = 0; $i < count($this->users); $i++) {
            $userData = $this->users[$i];

            $user = new User();
            $user->setEmail($userData[0]);

            $user->setPhone($userData[1]);

            $this->addReference(
                'user:' . $i,
                $user
            );

            $manager->persist($user);
        }

        $manager->flush();
    }

    private function loadCars(ObjectManager $manager)
    {
        for ($i = 0; $i < count($this->cars); $i++) {
            $carData = $this->cars[$i];

            $car = new Car();
            $car->setPrice($carData[0]);

            $date = new \DateTime();
            $date->modify($carData[1]);
            $date->modify($carData[2]);
            $car->setCreatedAt($date);

            /** @var City $city */
            $city = $this->getReference('city:' . $carData[3]);
            $car->setCity($city);

            /** @var User $user */
            $user = $this->getReference('user:' . rand(0, count($this->users) - 1));
            $car->setUser($user);

            $brandId = array_rand($this->models);
            $modelId = rand(0, count($this->models[$brandId]) - 1);

            /** @var Model $model */
            $model = $this->getReference(
                'model:' . $this->models[$brandId][$modelId]
            );
            $car->setModel($model);

            /** @var Brand $brand */
            $brand = $this->getReference('brand:' . $model->getBrand()->getBrand());
            $car->setBrand($brand);

            $car->setAddress(
                $this->address[$i][0]
            );

            // TODO Sukurti listener ir service, kad kai kuriama nauja mašina, automatiškai pasiimtu iš google api
            // TODO apytikslių koordinačių saugojimas... arba grąžinimas...

            $latitude = substr($this->address[$i][1], 0, -4) . rand(1111, 9999);
            $longitude = substr($this->address[$i][2], 0, -4) . rand(1111, 9999);

            $car->setLatitude($latitude);
            $car->setLongitude($longitude);

            $this->addReference(
                'car:' . $i,
                $car
            );

            $manager->persist($car);
        }

        $manager->flush();
    }

    private function loadRentings(ObjectManager $manager)
    {
        foreach ($this->renting as $rentingData) {
            $renting = new Renting();

            $renting->setCar($this->getReference(
                'car:' . $rentingData[0]
            ));

            $date = new \DateTime();
            $date->modify($rentingData[1]);
            $date->modify($rentingData[2]);
            $renting->setRentedFrom($date);

            $date = new \DateTime();
            $date->modify($rentingData[3]);
            $date->modify($rentingData[4]);
            $renting->setRentedUntil($date);

            $manager->persist($renting);
        }

        $manager->flush();
    }

    private function loadImages(ObjectManager $manager)
    {
        for ($i = 0; $i < count($this->images); $i++) {
            if ($this->hasReference('car:' . $i)) {
                for ($j = 0; $j < count($this->images[$i]); $j++) {
                    $imageData = $this->images[$i][$j];

                    if ($imageData != "") {
                        $image = new Image();
                        $image->setImage(
                            $imageData
                        );

                        /** @var Car $car */
                        $car = $this->getReference('car:' . $i);
                        $image->setCar($car);

                        $this->addReference(
                            'image:' . $i . $j,
                            $image
                        );

                        $manager->persist($image);
                    }
                }
            }
        }

        $manager->flush();
    }

    private function loadBookings(ObjectManager $manager)
    {
        foreach ($this->bookings as $bookingData) {
            if ($this->hasReference('car:' . $bookingData[0])) {
                $booking = new Booking();

                $date = new \DateTime();
                $date->modify($bookingData[1]);
                $date->modify($bookingData[2]);
                $booking->setBookedFrom($date);

                $date = new \DateTime();
                $date->modify($bookingData[3]);
                $date->modify($bookingData[4]);
                $booking->setBookedUntil($date);

                /** @var Car $car */
                $car = $this->getReference('car:' . $bookingData[0]);
                $booking->setCar($car);

                $manager->persist($booking);
            }
        }

        $manager->flush();
    }
}
