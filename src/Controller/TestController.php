<?php

namespace App\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class TestController
 * @package App\Controller
 * @Rest\RouteResource("Tests", pluralize=false)
 */
class TestController extends FOSRestController implements ClassResourceInterface
{
    public function postAction()
    {
        return $this->handleView($this->view(
            [
                'haha' => 'ok'
            ],
            Response::HTTP_CREATED
        ));
    }

    public function getAction()
    {
        $data = [
            'haha' => 'ok'
        ];

        return View::create()
            ->setStatusCode(Response::HTTP_OK)
            ->setData($data);
    }
}
