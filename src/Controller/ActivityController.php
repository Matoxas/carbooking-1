<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ActivityController extends AbstractController
{
    /**
     * @Route("/", name="activity_home")
     */
    public function index()
    {
        return $this->render('activity/index.html.twig');
    }
}
