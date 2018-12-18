<?php
namespace App\Controller;

use App\Repository\CityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="home")
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function index(Request $request)
    {
        $appEnv = $request->server->get('APP_ENV');

        if ($appEnv == 'prod') {
            $domainName = $request->server->get('HTTP_HOST');

            return $this->redirect('https://' . $domainName . '/feed');
        }

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
     * @Route("/feed/{token}", name="home_feed_token")
     */
    public function feedHash($token)
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
     * @Route("/feed/carListing/{id}/{token}/not_approved", name="home_car_listing_by_id_plus_token_not_approved")
     */
    public function carListingByIdPlusHashNotApproved($id, $token)
    {
        return $this->render('home/index.html.twig');
    }

    /**
     * @Route("/feed/carListing/{id}/{token}", name="home_car_listing_by_id_plus_token")
     */
    public function carListingByIdPlusHash($id, $token)
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
