<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class CleanOldDataCommand extends Command
{
    protected static $defaultName = 'app:clean-old-data';

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
        //TODO: Ištrinti senas mašinas...

        $io->text('> Deleting old booking dates...');
        $io->text('> Deleting old renting dates...');
        $io->text('> Deleting old comments...');
        $io->text('> Deleting old users...');

        $io->error('You dont have new commant! :D DELETE?');

        $io->success('All old data was successfully removed!');
    }
}
