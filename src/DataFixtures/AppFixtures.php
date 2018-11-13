<?php

namespace App\DataFixtures;

use App\Entity\Booking;
use App\Entity\Brand;
use App\Entity\Car;
use App\Entity\City;
use App\Entity\Image;
use App\Entity\Model;
use App\Entity\RentDate;
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
     * @var RentDate
     */
    private $rentDates;

    /**
     * @var Image
     */
    private $images;

    /**
     * @var Booking
     */
    private $bookings;

    public function load(ObjectManager $manager)
    {
        $this->loadFiles();
        $this->loadCities($manager);
        $this->loadBrandAndModels($manager);
        $this->loadUsers($manager);
        $this->loadCars($manager);
        $this->loadRentDates($manager);
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

        $path = 'public/data/RentDates.csv';
        $this->rentDates = Utils::getData($path);

        $path = 'public/data/Images.csv';
        $this->images = Utils::getData($path);

        $path = 'public/data/Bookings.csv';
        $this->bookings = Utils::getData($path);
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
            $car->setPhone($carData[0]);

            $car->setPrice($carData[1]);

            $date = new \DateTime();
            $date->modify($carData[2]);
            $date->modify($carData[3]);
            $car->setCreatedAt($date);

            /** @var City $city */
            $city = $this->getReference('city:' . $this->cities[array_rand($this->cities)][0]);
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

            $this->addReference(
                'car:' . $i,
                $car
            );

            $manager->persist($car);
        }

        $manager->flush();
    }

    private function loadRentDates(ObjectManager $manager)
    {
        foreach ($this->rentDates as $rentDateData) {
            $rentDate = new RentDate();

            $rentDate->setCar($this->getReference(
                'car:' . $rentDateData[0]
            ));

            $date = new \DateTime();
            $date->modify($rentDateData[1]);
            $date->modify($rentDateData[2]);
            $rentDate->setRentedFrom($date);

            $date = new \DateTime();
            $date->modify($rentDateData[3]);
            $date->modify($rentDateData[4]);
            $rentDate->setRentedUntil($date);

            $manager->persist($rentDate);
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
