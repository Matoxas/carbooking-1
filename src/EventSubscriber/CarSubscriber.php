<?php

namespace App\EventSubscriber;

use App\Entity\Car;
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
            $entityManager = $args->getObjectManager();

            //TODO: Pagal entityje atsiųstą car->getAddress, prisettinti long ir lat
        }
    }
}
