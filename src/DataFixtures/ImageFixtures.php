<?php

namespace App\DataFixtures;

use App\Entity\Car;
use App\Entity\Image;
use App\Utils\Utils;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class ImageFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $path = 'public/data/Images.csv';
        $data = Utils::getData($path);

        foreach ($data as $index => $images) {
            /** @var Car $car */
            $car = $this->getReference('car:' . $index);
            foreach ($images as $image) {
                if (!empty($image)) {
                    $image = $this->createImage($image, $car);
                    $manager->persist($image);
                }
            }
        }

        $manager->flush();
    }

    private function createImage(string $imagePath, Car $car): Image
    {
        $image = new Image();

        $image->setCar($car);
        $image->setImage($imagePath);

        return $image;
    }

    public function getDependencies()
    {
        return [
            CarFixtures::class,
        ];
    }
}
