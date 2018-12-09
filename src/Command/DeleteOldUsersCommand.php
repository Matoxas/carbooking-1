<?php

namespace App\Command;

use App\Entity\Car;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class DeleteOldUsersCommand extends Command
{
    protected static $defaultName = 'app:delete-old-users';
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

        $io->text('> Deleting old users...');

        $users = $this->entityManager->getRepository(User::class)->findAll();

        /** @var User $user */
        foreach ($users as $user) {
            $cars = $this->entityManager->getRepository(Car::class)->findBy(['user' => $user->getId()]);
            $carsCount = count($cars);

            if ($carsCount == 0) {
                $date = new \DateTime();
                $date->modify('-7 day');

                if ($user->getCreatedAt() < $date) {
                    $this->entityManager->remove($user);
                    $this->entityManager->flush();
                }
            }
        }

        $io->success('All old users was successfully removed!');
    }
}
