<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Utils\Utils;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserAdminFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    /**
     * UserAdminFixtures constructor.
     * @param UserPasswordEncoderInterface $passwordEncoder
     */
    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $path = 'public/data/UsersAdmin.csv';
        $data = Utils::getData($path);

        foreach ($data as $index => $userData) {
            $user = $this->createUser($userData, $index);
            $manager->persist($user);
        }

        $manager->flush();
    }

    private function createUser(array $data, int $index): User
    {
        $user = new User();

        $user->setEmail($data[0]);
        $user->setPhone($data[1]);
        $user->setName($data[2]);

        $password = $this->passwordEncoder->encodePassword(
            $user,
            $data[3]
        );

        $user->setPassword($password);

        $this->addReference(
            'userAdmin:' . $index,
            $user
        );

        return $user;
    }
}
