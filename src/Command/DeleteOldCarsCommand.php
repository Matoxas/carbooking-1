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
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;

class DeleteOldCarsCommand extends Command
{
    /**
     * @var string
     */
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

    /**
     *
     */
    protected function configure()
    {
        $this
            ->setDescription('Cleaned old data from database.')
            ->addArgument('arg1', InputArgument::OPTIONAL, 'arg1 day')
            ->addOption('outdated', null, InputOption::VALUE_NONE, 'Outdated option')
        ;
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     * @return int|void|null
     * @throws \Exception
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $io = new SymfonyStyle($input, $output);

        if ($input->getOption('outdated')) {
            $arg1 = (int) $input->getArgument('arg1');

            if ($arg1 && is_numeric($arg1)) {
                $io->text('> Deleting old cars...');
                $this->deleteOldCars($arg1, $io);
                $io->success('All old cars was successfully removed!');
            }
        } else {
            $io->error('> Example: bin/console ' . DeleteOldCarsCommand::$defaultName . ' --outdated 7');
        }
    }

    /**
     * @param int $arg1
     * @param SymfonyStyle $io
     * @throws \Exception
     */
    private function deleteOldCars(int $arg1, SymfonyStyle $io)
    {
        $cars = $this->entityManager->getRepository(Car::class)->findAll();

        /** @var Car $car */
        foreach ($cars as $car) {
            $rentings = $car->getRenting()->toArray();

            if ($this->isRentingExpired($rentings, $arg1)) {
                $this->removeRenting($rentings);
                $this->removeImages($car->getImages()->toArray());
                $this->removeBookings($car->getBookings()->toArray());
                $this->removeComments($car->getComments()->toArray());

                /** @var User $user */
                $user = $car->getUser();

                $this->entityManager->remove($car);
                $this->entityManager->flush();

                try {
                    $this->entityManager->remove($user);
                    $this->entityManager->flush();
                } catch (\Exception $exception) {
                    $io->writeln($exception->getMessage());
                }
            }
        }
    }

    /**
     * @param array $rentings
     * @param int $arg1
     * @return bool
     * @throws \Exception
     */
    private function isRentingExpired(array $rentings, int $arg1): bool
    {
        $date = new \DateTime();
        $date->modify('-' . $arg1 . ' day');
        $response = true;

        /** @var Renting $renting */
        foreach ($rentings as $renting) {
            if ($renting->getRentedUntil() > $date) {
                $response = false;
            }
        }

        return $response;
    }

    /**
     * @param array $rentings
     */
    private function removeRenting(array $rentings)
    {
        /** @var Renting $renting */
        foreach ($rentings as $renting) {
            $this->entityManager->remove($renting);
        }
    }

    /**
     * @param array $images
     */
    private function removeImages(array $images)
    {
        /** @var Image $image */
        foreach ($images as $image) {
            @unlink($image->getImage());
            $this->entityManager->remove($image);
        }
    }

    /**
     * @param array $bookings
     */
    private function removeBookings(array $bookings)
    {
        /** @var Booking $booking */
        foreach ($bookings as $booking) {
            $this->entityManager->remove($booking);
        }
    }

    /**
     * @param array $comments
     */
    private function removeComments(array $comments)
    {
        /** @var Comment $comment */
        foreach ($comments as $comment) {
            $this->entityManager->remove($comment);
        }
    }
}
