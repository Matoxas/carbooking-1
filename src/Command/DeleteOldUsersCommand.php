<?php

namespace App\Command;

use App\Entity\Car;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;

class DeleteOldUsersCommand extends Command
{
    /**
     * @var string
     */
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
                $io->text('> Deleting old users...');
                $this->deleteOldUsers($arg1);
                $io->success('All old users was successfully removed!');
            }
        } else {
            $io->error('> Example: bin/console ' . DeleteOldUsersCommand::$defaultName . ' --outdated 7');
        }
    }

    /**
     * @param int $arg1
     * @throws \Exception
     */
    private function deleteOldUsers(int $arg1)
    {
        $users = $this->entityManager->getRepository(User::class)->findAll();

        /** @var User $user */
        foreach ($users as $user) {
            $cars = $this->entityManager->getRepository(Car::class)->findBy(['user' => $user->getId()]);
            $carsCount = count($cars);

            if ($carsCount == 0) {
                $date = new \DateTime();
                $date->modify('-' . $arg1 . ' day');

                if ($user->getCreatedAt() < $date && $user->getPassword() == null) {
                    $this->entityManager->remove($user);
                    $this->entityManager->flush();
                }
            }
        }
    }
}
