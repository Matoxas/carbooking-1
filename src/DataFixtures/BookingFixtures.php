<?php

namespace App\DataFixtures;

use App\Entity\Booking;
use App\Entity\Car;
use App\Utils\Utils;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class BookingFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $path = 'public/data/Bookings.csv';
        $data = Utils::getData($path);

        foreach ($data as $index => $bookingData) {
            $booking = $this->createBooking($bookingData, $index);
            $manager->persist($booking);
        }

        $manager->flush();
    }

    private function createBooking(array $data, int $index): Booking
    {
        $booking = new Booking();

        $date = new \DateTime();
        $date->modify($data[1]);
        $date->modify($data[2]);
        $booking->setBookedFrom($date);

        $date = new \DateTime();
        $date->modify($data[3]);
        $date->modify($data[4]);
        $booking->setBookedUntil($date);

        /** @var Car $car */
        $car = $this->getReference('car:' . $index);
        $booking->setCar($car);

        return $booking;
    }

    public function getDependencies()
    {
        return [
            CarFixtures::class,
        ];
    }
}
