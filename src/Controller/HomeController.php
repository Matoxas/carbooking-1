<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function index()
    {
        return $this->render('home/index.html.twig');
    }

    /**
     * @Route("/feed", name="home_feed")
     */
    public function feed()
    {
        return $this->render('home/index.html.twig');
    }

    /**
     * @Route("/feed/carListing/{id}", name="home_car_listing_by_id")
     */
    public function carListingById($id)
    {
        return $this->render('home/index.html.twig');
    }

    /**
     * @Route("/carListing", name="home_car_listing")
     */
    public function carListing()
    {
        return $this->render('home/index.html.twig');
    }

    /**
     * @Route("/newcar", name="home_new_car")
     */
    public function newCar()
    {
        return $this->render('home/index.html.twig');
    }

    /**
     * @Route("/map", name="home_map")
     */
    public function map()
    {
        return $this->render('home/index.html.twig');
    }

    /**
     * @Route("/favourites", name="home_favourites")
     */
    public function favourites()
    {
        return $this->render('home/index.html.twig');
    }
}
