<?php

namespace App\Command;

use App\Entity\Booking;
use App\Entity\Car;
use App\Entity\Comment;
use App\Entity\Image;
use App\Entity\Renting;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class DeleteOldCarsCommand extends Command
{
    protected static $defaultName = 'app:delete-old-cars';
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * CleanOldDataCommand constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        parent::__construct();
        $this->entityManager = $entityManager;
    }

    protected function configure()
    {
        $this
            ->setDescription('Cleaned old data from database.')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);

        $io->text('> Deleting old cars...');

        $cars = $this->entityManager->getRepository(Car::class)->findAll();

        /** @var Car $car */
        foreach ($cars as $car) {
            $rentings = $car->getRenting()->toArray();

            if ($this->isRentingExpired($rentings)) {
                /** @var Renting $renting */
                foreach ($rentings as $renting) {
                    $this->entityManager->remove($renting);
                }

                /** @var Image $image */
                foreach ($car->getImages()->toArray() as $image) {
                    $this->entityManager->remove($image);
                }

                /** @var Booking $booking */
                foreach ($car->getBookings()->toArray() as $booking) {
                    $this->entityManager->remove($booking);
                }

                /** @var Comment $comment */
                foreach ($car->getComments()->toArray() as $comment) {
                    $this->entityManager->remove($comment);
                }

                /** @var User $user */
                $user = $car->getUser();

                $this->entityManager->remove($car);
                $this->entityManager->flush();

                try {
                    $this->entityManager->remove($user);
                    $this->entityManager->flush();
                } catch (\Exception $exception) {
                }
            }
        }

        $io->success('All old cars was successfully removed!');
    }

    private function isRentingExpired(array $rentings): bool
    {
        $date = new \DateTime();
        $date->modify('-7 day');
        $response = true;

        /** @var Renting $renting */
        foreach ($rentings as $renting) {
            if ($renting->getRentedUntil() > $date) {
                $response = false;
            }
        }

        return $response;
    }
}
