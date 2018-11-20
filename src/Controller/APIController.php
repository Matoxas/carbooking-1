<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Entity\Brand;
use App\Entity\Car;
use App\Entity\City;
use App\Entity\Image;
use App\Entity\Model;
use App\Entity\RentDate;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 * @Method({"GET", "POST"})
 */
class APIController extends AbstractController
{
    /**
     * @Route("/cars", name="api_cars")
     */
    public function showCars()
    {
        $data = [];

        $cars = $this->getDoctrine()
            ->getRepository(Car::class)
            ->findCars();

        foreach ($cars as &$value) {
            $value['price'] = (double) number_format($value['price'], 2);
            $value['createdAt'] = $value['createdAt']->format('Y-m-d H:i:s');
        }

        foreach ($cars as &$car) {
            $images = $this->getDoctrine()
                ->getRepository(Image::class)
                ->findImagesByCarId($car['id']);

            $images = array_column($images, 'image');

            $car['images'] = $images;

            foreach ($car['images'] as &$image) {
                $image = 'uploads/' . $image;
            }

            if (empty($car['images'])) {
                $car['images'] = ['images/car-default.jpeg'];
            }
        }

        foreach ($cars as &$car) {
            $rentDates = $this->getDoctrine()
                ->getRepository(RentDate::class)
                ->findRentDatesByCarId($car['id']);

            foreach ($rentDates as &$value) {
                $value['rentedFrom'] = $value['rentedFrom']->format('Y-m-d H:i:s');
                $value['rentedUntil'] = $value['rentedUntil']->format('Y-m-d H:i:s');
            }

            $car['rentDates'] = $rentDates;
        }

        foreach ($cars as &$car) {
            $bookingDates = $this->getDoctrine()
                ->getRepository(Booking::class)
                ->findBookingDatesByCarId($car['id']);

            foreach ($bookingDates as &$value) {
                $value['bookedFrom'] = $value['bookedFrom']->format('Y-m-d H:i:s');
                $value['bookedUntil'] = $value['bookedUntil']->format('Y-m-d H:i:s');
            }

            $car['bookingDates'] = $bookingDates;
        }

        $data = array_merge($data, $cars);

        return $this->json([
            'cars_count' => count($cars),
            'data' => $data,
        ]);
    }

    /**
     * @Route("/cars/filter", name="api_cars_filter")
     */
    public function showFilteredCars(Request $request)
    {

        $data = $request->getContent();
        $data = json_decode($data, true);

        return $this->json($data);
    }

    /**
     * @Route("/car/{id}", name="api_car_individual")
     */
    public function showCar($id)
    {
        $data = [];

        $carData = $this->getDoctrine()
            ->getRepository(Car::class)
            ->findCarById($id);

        $carData['price'] = (double) number_format($carData['price'], 2);
        $carData['createdAt'] = $carData['createdAt']->format('Y-m-d H:i:s');

        $data = array_merge($data, $carData);

        $images = $this->getDoctrine()
            ->getRepository(Image::class)
            ->findImagesByCarId($id);

        $images = array_column($images, 'image');

        $data['images'] = $images;

        foreach ($data['images'] as &$image) {
            $image = 'uploads/' . $image;
        }

        if (empty($data['images'])) {
            $data['images'] = ['images/car-default.jpeg'];
        }

        $rentDates = $this->getDoctrine()
            ->getRepository(RentDate::class)
            ->findRentDatesByCarId($id);

        foreach ($rentDates as &$value) {
            $value['rentedFrom'] = $value['rentedFrom']->format('Y-m-d H:i:s');
            $value['rentedUntil'] = $value['rentedUntil']->format('Y-m-d H:i:s');
        }

        $data['rentDates'] = $rentDates;

        $bookingDates = $this->getDoctrine()
            ->getRepository(Booking::class)
            ->findBookingDatesByCarId($id);

        foreach ($bookingDates as &$value) {
            $value['bookedFrom'] = $value['bookedFrom']->format('Y-m-d H:i:s');
            $value['bookedUntil'] = $value['bookedUntil']->format('Y-m-d H:i:s');
        }

        $data['bookingDates'] = $bookingDates;

        return $this->json([
            'data' => $data,
        ]);
    }

    /**
     * @Route("/brands", name="api_brands")
     */
    public function showBrands()
    {
        $brands = $this->getDoctrine()
            ->getRepository(Brand::class)
            ->findAllBrand();

        return $this->json([
            'data' => $brands,
        ]);
    }

    /**
     * @Route("/models", name="api_models_all")
     */
    public function showModels()
    {
        $models = $this->getDoctrine()
            ->getRepository(Model::class)
            ->findAllModels();

        return $this->json([
            'data' => $models,
        ]);
    }

    /**
     * @Route("/models/{brandId}", name="api_models_by_brandId")
     */
    public function showModelsById($brandId)
    {
        $brand = $this->getDoctrine()
            ->getRepository(Brand::class)
            ->find($brandId);

        $models = $this->getDoctrine()
            ->getRepository('App:Model')
            ->findAllModelsByBrand($brandId);

        return $this->json([
            'id' => $brand->getId(),
            'brand' => $brand->getBrand(),
            'data' => $models,
        ]);
    }

    /**
     * @Route("/cities", name="api_cities_all")
     */
    public function showCities()
    {
        $countries = $this->getDoctrine()
            ->getRepository(City::class)
            ->findAllCities();

        return $this->json([
            'data' => $countries,
        ]);
    }
}
