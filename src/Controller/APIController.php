<?php

namespace App\Controller;

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

            $temp = [
                'image' => 'example.jpg',
                'email' => $userData->getEmail(),
                'phone' => $carData->getPhone(),
                'price' => $carData->getPrice(),
                'brand' => $brand,
                'model' => $model,
                'city' => $carData->getCity()->getCity(),
                'rentDates' => $available,
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
     * @Route("/test/{text}", name="api_test")
     */
    public function test(string $text)
    {
        return $this->json([
            'Perduodamas tekstas ' => $text,
        ]);
    }
}
