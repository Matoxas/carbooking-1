<?php

namespace App\EventListener;

use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class BadUrlRequestListener
{
    /**
     * @var Router
     */
    private $router;

    /**
     * BadUrlRequestListener constructor.
     * @param Router $router
     */
    public function __construct(Router $router)
    {
        $this->router = $router;
    }

    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        $exception = $event->getException();

        if ($exception instanceof NotFoundHttpException) {
            $url = $this->router->generate('home');
            $response = new RedirectResponse($url);
            $event->setResponse($response);
        }
    }
}
