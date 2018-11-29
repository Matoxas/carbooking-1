<?php

namespace App\Controller;

use App\Repository\CityRepository;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class TestController
 * @package App\Controller
 * @Rest\Prefix("api")
 */
class APIController extends FOSRestController
{
    /**
     * @var CityRepository
     */
    private $cityRepository;

    /**
     * TestController constructor.
     * @param CityRepository $cityRepository
     */
    public function __construct(CityRepository $cityRepository)
    {
        $this->cityRepository = $cityRepository;
    }

    /**
     * @Rest\Get("/cities")
     * @return View
     */
    public function getCitiesAction(): View
    {
        return $this->view(
            $this->cityRepository->findAll(),
            Response::HTTP_OK
        );
    }
}
