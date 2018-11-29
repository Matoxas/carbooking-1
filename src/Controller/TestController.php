<?php

namespace App\Controller;

use App\Repository\CityRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Routing\ClassResourceInterface;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class TestController
 * @package App\Controller
 * @Rest\Prefix("api")
 */
class TestController extends FOSRestController implements ClassResourceInterface
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var CityRepository
     */
    private $cityRepository;

    /**
     * TestController constructor.
     * @param EntityManagerInterface $entityManager
     * @param CityRepository $cityRepository
     */
    public function __construct(EntityManagerInterface $entityManager, CityRepository $cityRepository)
    {
        $this->entityManager = $entityManager;
        $this->cityRepository = $cityRepository;
    }

    public function postAction()
    {
        return $this->handleView($this->view(
            [
                'haha' => 'ok POST'
            ],
            Response::HTTP_CREATED
        ));
    }

    /**
     * @Rest\Get("/get")
     * @return View
     */
    public function getCarAction(): View
    {
        $brand = $this->cityRepository->findAll();

        if ($brand === null) {
            throw new NotFoundHttpException();
        }

        //var_dump($brand);die;

        //return new View("There are error test!", Response::HTTP_NOT_FOUND);

        return $this->view(
            $brand,
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Put("/put")
     * @param Request $request
     * @return View
     */
    public function putCarAction(Request $request): View
    {
        $data = [
            'haha' => 'ok PUT'
        ];

        //return new View("There are error test!", Response::HTTP_NOT_FOUND);

        return $this->view(
            $data,
            Response::HTTP_NOT_FOUND
        );
    }
}
