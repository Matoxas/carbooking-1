<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Utils\Utils;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $path = 'public/data/Users.csv';
        $data = Utils::getData($path);

        foreach ($data as $index => $userData) {
            $user = $this->createUser($userData, $index);
            $manager->persist($user);
        }

        $manager->flush();
    }

    /**
     * @param array $data
     * @param int $index
     * @return User
     */
    private function createUser(array $data, int $index): User
    {
        $user = new User();

        $user->setEmail($data[0]);
        $user->setPhone($data[1]);
        $user->setName($data[2]);

        $this->addReference(
            'user:' . $index,
            $user
        );

        return $user;
    }
}
