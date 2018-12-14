<?php

namespace App\Serializer\Normalizer;

use App\Entity\Booking;
use App\Entity\Car;
use App\Entity\Image;
use App\Entity\Renting;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class CarNormalizer implements NormalizerInterface
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * CarNormalizer constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function normalize($object, $format = null, array $context = array())
    {
        return [
            'id'            => $object->getId(),
            'price'         => number_format($object->getPrice(), 2),
            'phone'         => '+370' . $object->getUser()->getPhone(),
            'description'   => $object->getDescription(),
            'createdAt'     => $object->getCreatedAt()->format('Y-m-d H:i:s'),
            'address'       => $object->getAddress(),
            'latitude'      => $object->getLatitude(),
            'longitude'     => $object->getLongitude(),
            'city'          => $object->getCity()->getCity(),
            'brand'         => $object->getBrand()->getBrand(),
            'model'         => $object->getModel()->getModel(),
            'images'        => $this->getImages($object),
            'rentDates'     => $this->getRentDates($object),
            'bookingDates'  => $this->getBookings($object)
        ];
    }

    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof Car;
    }

    private function getImages(Car $object): array
    {
        /** @var array $images */
        $images = $object->getImages()->toArray();

        $images = array_map(function (Image $img) {
            return $img->getImage();
        }, $images);

        if (empty($images)) {
            return ['images/car-default.jpeg'];
        }

        return $images;
    }

    private function getRentDates(Car $object): array
    {
        /** @var array $images */
        $rentings = $object->getRenting()->toArray();

        $rentings = array_map(function (Renting $renting) {
            return [
                'rentedFrom' => $renting->getRentedFrom()->format('Y-m-d H:i:s'),
                'rentedUntil' => $renting->getRentedUntil()->format('Y-m-d H:i:s')
            ];
        }, $rentings);

        return $rentings;
    }

    private function getBookings(Car $object): array
    {
        /** @var array $images */
        $bookings = $object->getBookings()->toArray();

        $bookings = array_map(function (Booking $booking) {
            if (!$booking->getApproved()) {
                return [];
            }

            return [
                'bookedFrom' => $booking->getBookedFrom()->format('Y-m-d H:i:s'),
                'bookedUntil' => $booking->getBookedUntil()->format('Y-m-d H:i:s')
            ];
        }, $bookings);

        return $bookings;
    }
}
