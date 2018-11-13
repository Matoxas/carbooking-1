<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Entity\Image;
use App\Entity\RentDate;
use App\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
        $cars = $this->getDoctrine()
            ->getRepository('App:Car')
            ->findAll();

        $data = [];
        foreach ($cars as $carData) {
            /** @var User $userData */
            $userData = $carData->getUser();

            $brand = $carData->getBrand()->getBrand();
            $model = $carData->getModel()->getModel();

            /** @var RentDate $rentDates */
            $rentDates = $carData->getRentDates()->getValues();

            $available = [];
            /** @var RentDate $value */
            foreach ($rentDates as $value) {
                array_push($available, [
                    'rentedFrom' => $value->getRentedFrom()->format('Y-m-d H:i:s'),
                    'rentedUntil' => $value->getRentedUntil()->format('Y-m-d H:i:s'),
                ]);
            }

            /** @var Booking $bookedDates */
            $bookedDates = $carData->getBookings()->getValues();

            $booked = [];
            /** @var Booking $value */
            foreach ($bookedDates as $value) {
                array_push($available, [
                    'bookedFrom' => $value->getBookedFrom()->format('Y-m-d H:i:s'),
                    'bookedUntil' => $value->getBookedUntil()->format('Y-m-d H:i:s'),
                ]);
            }

            /** @var Image $image */
            $imagesClass = $carData->getImages()->getValues();

            $images = [];
            /** @var RentDate $value */
            foreach ($imagesClass as $image) {
                array_push($images, $image->getImage());
            }

            if (empty($images)) {
                $images = ["images/car-default.jpeg"];
            }

            $temp = [
                'id' => $carData->getId(),
                'images' => $images,
                'email' => $userData->getEmail(),
                'phone' => $carData->getPhone(),
                'price' => $carData->getPrice(),
                'brand' => $brand,
                'model' => $model,
                'city' => $carData->getCity()->getCity(),
                'rentDates' => $available,
                'bookingDates' => $booked,
                'createdAt' => $carData->getCreatedAt(),
            ];

            array_push($data, $temp);
        }

        return $this->json([
            'cars_count' => count($cars),
            'data' => $data
        ]);
    }

    /**
     * @Route("/car/{id}", name="api_individual_car")
     */
    public function showCar($id)
    {
        $carData = $this->getDoctrine()
            ->getRepository('App:Car')
            ->find($id);

        $data = [];
            /** @var User $userData */
            $userData = $carData->getUser();

            $brand = $carData->getBrand()->getBrand();
            $model = $carData->getModel()->getModel();

            /** @var RentDate $rentDates */
            $rentDates = $carData->getRentDates()->getValues();

            $available = [];
            /** @var RentDate $value */
            foreach ($rentDates as $value) {
                array_push($available, [
                    'rentedFrom' => $value->getRentedFrom()->format('Y-m-d H:i:s'),
                    'rentedUntil' => $value->getRentedUntil()->format('Y-m-d H:i:s'),
                ]);
            }

            /** @var Booking $bookedDates */
            $bookedDates = $carData->getBookings()->getValues();

            $booked = [];
            /** @var Booking $value */
            foreach ($bookedDates as $value) {
                array_push($available, [
                    'bookedFrom' => $value->getBookedFrom()->format('Y-m-d H:i:s'),
                    'bookedUntil' => $value->getBookedUntil()->format('Y-m-d H:i:s'),
                ]);
            }

            /** @var Image $image */
            $imagesClass = $carData->getImages()->getValues();

            $images = [];
            /** @var RentDate $value */
            foreach ($imagesClass as $image) {
                array_push($images, $image->getImage());
            }

            if (empty($images)) {
                $images = ["images/car-default.jpeg"];
            }

            $temp = [
                'id' => $carData->getId(),
                'images' => $images,
                'email' => $userData->getEmail(),
                'phone' => $carData->getPhone(),
                'price' => $carData->getPrice(),
                'brand' => $brand,
                'model' => $model,
                'city' => $carData->getCity()->getCity(),
                'rentDates' => $available,
                'bookingDates' => $booked,
                'createdAt' => $carData->getCreatedAt(),
            ];

            array_push($data, $temp);

        return $this->json([
            'data' => $data[0],
        ]);
    }
}
