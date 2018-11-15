<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="activity_home")
     */
    public function index()
    {
        return $this->render('home/index.html.twig');
    }
    /**
     * @Route("/feed", name="activity_feed")
     */
    public function indexFeed()
    {
        return $this->render('home/index.html.twig');
    }
    /**
     * @Route("/feed/carListing/{id}", name="activity_feed_car_listing_id")
     */
    public function indexCarListingById($id)
    {
        return $this->render('home/index.html.twig');
    }
    /**
     * @Route("/carListing", name="activity_car_listing")
     */
    public function indexCarListing()
    {
        return $this->render('home/index.html.twig');
    }
}
