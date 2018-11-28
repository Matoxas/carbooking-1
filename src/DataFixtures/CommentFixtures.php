<?php

namespace App\DataFixtures;

use App\Entity\Car;
use App\Entity\Comment;
use App\Utils\Utils;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class CommentFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $path = 'public/data/Comments.csv';
        $data = Utils::getData($path);

        foreach ($data as $index => $commentData) {
            $comment = $this->createComment($commentData, $index);
            $manager->persist($comment);
        }

        $manager->flush();
    }

    private function createComment(array $data, int $index): Comment
    {
        $comment = new Comment();

        /** @var Car $car */
        $car = $this->getReference('car:' . $data[0]);
        $comment->setCar($car);

        $comment->setName($data[1]);
        $comment->setComment($data[2]);

        $date = new \DateTime();
        $date->modify($data[3]);
        $date->modify($data[4]);
        $comment->setCreatedAt($date);

        return $comment;
    }

    public function getDependencies()
    {
        return [
            CarFixtures::class,
        ];
    }
}
