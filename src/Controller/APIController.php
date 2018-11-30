<?php

namespace App\Controller;

use App\Repository\BrandRepository;
use App\Repository\CarRepository;
use App\Repository\CityRepository;
use App\Repository\CommentRepository;
use App\Repository\ModelRepository;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
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
     * @var BrandRepository
     */
    private $brandRepository;
    /**
     * @var ModelRepository
     */
    private $modelRepository;
    /**
     * @var CarRepository
     */
    private $carRepository;
    /**
     * @var CommentRepository
     */
    private $commentRepository;

    /**
     * TestController constructor.
     * @param CityRepository $cityRepository
     * @param BrandRepository $brandRepository
     * @param ModelRepository $modelRepository
     * @param CarRepository $carRepository
     * @param CommentRepository $commentRepository
     */
    public function __construct(
        CityRepository $cityRepository,
        BrandRepository $brandRepository,
        ModelRepository $modelRepository,
        CarRepository $carRepository,
        CommentRepository $commentRepository
    ) {
        $this->cityRepository = $cityRepository;
        $this->brandRepository = $brandRepository;
        $this->modelRepository = $modelRepository;
        $this->carRepository = $carRepository;
        $this->commentRepository = $commentRepository;
    }

    /**
     * @Rest\Get("/cars", name="api_cars_all")
     * @param Request $request
     * @return View
     */
    public function getAllCarsAction(Request $request): View
    {
        $filters = $request->get('filters');
        $filters = json_decode($filters, true);

        $data = $this->carRepository->findFilterAndSortingCars($filters);

        return $this->view(
            [
                'cars_count' => count($data),
                'data' => $data
            ],
            Response::HTTP_OK
        );
    }


    /**
     * @Rest\Get("/car/{carId}", name="api_cars_carId")
     * @param int $carId
     * @return View
     */
    public function getCarByIdAction(int $carId): View
    {
        return $this->view(
            ['data' => $this->carRepository->find($carId)],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Get("/brands", name="api_brands_all")
     * @return View
     */
    public function getAllBrandsAction(): View
    {
        return $this->view(
            ['data' => $this->brandRepository->findAll()],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Get("/models", name="api_models_all")
     * @return View
     */
    public function getAllModelsAction(): View
    {
        return $this->view(
            ['data' => $this->modelRepository->findAll()],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Get("/models/{brandId}", name="api_models_brandId")
     * @return View
     */
    public function getAllModelsByBrandIdAction(int $brandId): View
    {
        if ($this->modelRepository->findCountOfRecords($brandId) <= 0) {
            return $this->view([], Response::HTTP_OK);
        }

        return $this->view(
            [
                'id' => $brandId,
                'brand' => $this->brandRepository->find($brandId)->getBrand(),
                'data' => $this->modelRepository->findBy(['brand' => $brandId])
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Get("/cities/all", name="api_cities_all")
     * @return View
     */
    public function getAllCitiesAction(): View
    {
        return $this->view(
            ['data' => $this->cityRepository->findAll()],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Get("/cities", name="api_cities_filtered")
     * @return View
     */
    public function getFilteredCitiesAction(): View
    {
        return $this->view(
            ['data' => $this->cityRepository->findAllCitiesWithCars()],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Get("/comments/{carId}", name="api_comments_carId")
     * @param int $carId
     * @return View
     */
    public function getAllCommentsFilteredByCarIdAction(int $carId): View
    {
        return $this->view(
            [
                'carId' => $carId,
                'data' => $this->commentRepository->findBy(['car' => $carId], ['createdAt' => 'ASC'])
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Post("/reservations", name="api_reservations_new")
     * @param Request $request
     * @return View
     */
    public function postNewReservationsAction(Request $request): View
    {
        $reservation = $request->getContent('reservation');
        $reservation = json_decode($reservation, true);

        return $this->view($reservation, Response::HTTP_OK);

        return $this->view(
            [
                'status' => 'ok',
                'message' => ''
            ],
            Response::HTTP_OK
        );
    }
}
