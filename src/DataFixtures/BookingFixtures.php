<?php

namespace App\DataFixtures;

use App\Entity\Booking;
use App\Entity\Car;
use App\Entity\User;
use App\Utils\Utils;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class BookingFixtures extends Fixture implements DependentFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
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

    /**
     * @param array $data
     * @param int $index
     * @return Booking
     * @throws \Exception
     */
    private function createBooking(array $data, int $index): Booking
    {
        $booking = new Booking();

        /** @var Car $car */
        $car = $this->getReference('car:' . $data[0]);
        $booking->setCar($car);

        $date = new \DateTime();
        $date->modify($data[1]);
        $date->modify($data[2]);
        $booking->setBookedFrom($date);

        $date = new \DateTime();
        $date->modify($data[3]);
        $date->modify($data[4]);
        $booking->setBookedUntil($date);

        /** @var User $user */
        $user = $this->getReference('user:' . $data[5]);
        $booking->setUsers($user);

        $booking->setApproved(true);

        return $booking;
    }

    /**
     * @return array
     */
    public function getDependencies()
    {
        return [
            CarFixtures::class,
            UserFixtures::class,
        ];
    }
}
