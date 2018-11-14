<?php

namespace App\Controller;

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
            ->getRepository('App:Car')
            ->findCars();

        foreach ($cars as &$value) {
            $value['createdAt'] = $value['createdAt']->format('Y-m-d H:i:s');
        }

        foreach ($cars as &$car) {
            $images = $this->getDoctrine()
                ->getRepository('App:Image')
                ->findImagesByCarId($car['id']);

            $images = array_column($images, 'image');

            $car['images'] = $images;
        }

        foreach ($cars as &$car) {
            $rentDates = $this->getDoctrine()
                ->getRepository('App:RentDate')
                ->findRentDatesByCarId($car['id']);

            foreach ($rentDates as &$value) {
                $value['rentedFrom'] = $value['rentedFrom']->format('Y-m-d H:i:s');
                $value['rentedUntil'] = $value['rentedUntil']->format('Y-m-d H:i:s');
            }

            $car['rentDates'] = $rentDates;
        }

        foreach ($cars as &$car) {
            $bookingDates = $this->getDoctrine()
                ->getRepository('App:Booking')
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
        $data = [];
        $params = $request->query->all();
        $paramsAttr = ['location', 'brand', 'models', 'price_from', 'price_to'];

        foreach ($paramsAttr as $value) {
            if (isset($params[$value])) {
                $params[$value] = htmlspecialchars($params[$value]);
            }
        }

        $carsId = $this->getDoctrine()
            ->getRepository('App:Car')
            ->fetchFilteredCarsId($params);

        //pabaigti ;-D

        return $this->json([
            'cars_count' => count($carsId),
            'data' => $data,
        ]);
    }

    /**
     * @Route("/car/{id}", name="api_car_individual")
     */
    public function showCar($id)
    {
        $data = [];

        $carData = $this->getDoctrine()
            ->getRepository('App:Car')
            ->findCarById($id);

        $carData['createdAt'] = $carData['createdAt']->format('Y-m-d H:i:s');

        $data = array_merge($data, $carData);

        $images = $this->getDoctrine()
            ->getRepository('App:Image')
            ->findImagesByCarId($id);

        $images = array_column($images, 'image');

        $data['images'] = $images;

        $rentDates = $this->getDoctrine()
            ->getRepository('App:RentDate')
            ->findRentDatesByCarId($id);

        foreach ($rentDates as &$value) {
            $value['rentedFrom'] = $value['rentedFrom']->format('Y-m-d H:i:s');
            $value['rentedUntil'] = $value['rentedUntil']->format('Y-m-d H:i:s');
        }

        $data['rentDates'] = $rentDates;

        $bookingDates = $this->getDoctrine()
            ->getRepository('App:Booking')
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
            ->getRepository('App:Brand')
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
            ->getRepository('App:Model')
            ->findAllModels();

        return $this->json([
            'data' => $models,
        ]);
    }

    /**
     * @Route("/models/{id}", name="api_models_by_id")
     */
    public function showModelsById($id)
    {
        $brand = $this->getDoctrine()
            ->getRepository('App:Brand')
            ->find($id);

        $models = $this->getDoctrine()
            ->getRepository('App:Model')
            ->findAllModelsByBrand($id);

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
            ->getRepository('App:City')
            ->findAllCities();

        return $this->json([
            'data' => $countries,
        ]);
    }
}
