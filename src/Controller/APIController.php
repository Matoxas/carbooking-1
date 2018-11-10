<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 * @Method({"GET", "POST"})
 */
class APIController extends AbstractController
{
    /**
     * @Route("/", name="api_home")
     */
    public function index()
    {
        $brand = $this->getDoctrine()
            ->getRepository('App:Brand')
            ->findAll();

        var_dump($brand);

        return $this->json([
            'page' => 1,
            'data' => [
                "id" => 5,
                "title" => "Book1",
            ]
        ]);
    }
}