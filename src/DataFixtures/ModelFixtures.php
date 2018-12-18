<?php

namespace App\DataFixtures;

use App\Entity\Brand;
use App\Entity\Model;
use App\Utils\Utils;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class ModelFixtures extends Fixture implements DependentFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $path = 'public/data/Models.csv';
        $data = Utils::getData($path);

        foreach ($data as $lineIndex => $models) {
            /** @var Brand $brand */
            $brand = $this->getReference('brand:' . $lineIndex);
            foreach ($models as $columnIndex => $model) {
                $model = $this->createModel($model, $brand, $lineIndex, $columnIndex);
                $manager->persist($model);
            }
        }

        $manager->flush();
    }

    /**
     * @param string $modelTitle
     * @param Brand $brand
     * @param int $lineIndex
     * @param int $columnIndex
     * @return Model
     */
    private function createModel(string $modelTitle, Brand $brand, int $lineIndex, int $columnIndex): Model
    {
        $model = new Model();

        $model->setBrand($brand);
        $model->setModel($modelTitle);

        $this->addReference(
            'model:' . $lineIndex . '|' . $columnIndex,
            $model
        );

        return $model;
    }

    /**
     * @return array
     */
    public function getDependencies()
    {
        return [
            BrandFixtures::class,
        ];
    }
}
