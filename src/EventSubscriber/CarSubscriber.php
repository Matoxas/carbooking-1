<?php

namespace App\EventSubscriber;

use App\Entity\Car;
use App\Utils\Utils;
use Doctrine\Common\EventSubscriber;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;

class CarSubscriber implements EventSubscriber
{
    /**
     * @return array|string[]
     */
    public function getSubscribedEvents()
    {
        return [
            Events::prePersist,
            Events::preUpdate
        ];
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if ($entity instanceof Car) {
            if ($entity->getLatitude() == null || $entity->getLongitude() == null) {
                $address = $entity->getAddress();
                $location = Utils::fetchLocationByAddress($address);

                $entity->setLatitude($location['lat']);
                $entity->setLongitude($location['lng']);
            }
        }
    }

    /**
     * @param LifecycleEventArgs $args
     * @throws \Exception
     */
    public function preUpdate(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if ($entity instanceof Car) {
            $address = $entity->getAddress();
            $location = Utils::fetchLocationByAddress($address);

            $entity->setLatitude($location['lat']);
            $entity->setLongitude($location['lng']);
            $entity->setCreatedAt(new \DateTime());
        }
    }
}
