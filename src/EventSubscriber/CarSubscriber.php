<?php

namespace App\EventSubscriber;

use App\Entity\Car;
use App\Utils\Utils;
use Doctrine\Common\EventSubscriber;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;
use Doctrine\ORM\Events;

class CarSubscriber implements EventSubscriber
{
    public function getSubscribedEvents()
    {
        return [
            Events::prePersist
        ];
    }

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
}
