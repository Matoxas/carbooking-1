<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Entity\User;
use App\Repository\BrandRepository;
use App\Repository\CarRepository;
use App\Repository\CityRepository;
use App\Repository\CommentRepository;
use App\Repository\ModelRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Translation\TranslatorInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

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
     * @var ValidatorInterface
     */
    private $validator;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    /**
     * @var TranslatorInterface
     */
    private $translator;

    /**
     * TestController constructor.
     * @param CityRepository $cityRepository
     * @param BrandRepository $brandRepository
     * @param ModelRepository $modelRepository
     * @param CarRepository $carRepository
     * @param CommentRepository $commentRepository
     * @param ValidatorInterface $validator
     * @param EntityManagerInterface $entityManager
     * @param TranslatorInterface $translator
     */
    public function __construct(
        CityRepository $cityRepository,
        BrandRepository $brandRepository,
        ModelRepository $modelRepository,
        CarRepository $carRepository,
        CommentRepository $commentRepository,
        ValidatorInterface $validator,
        EntityManagerInterface $entityManager,
        TranslatorInterface $translator
    ) {
        $this->cityRepository = $cityRepository;
        $this->brandRepository = $brandRepository;
        $this->modelRepository = $modelRepository;
        $this->carRepository = $carRepository;
        $this->commentRepository = $commentRepository;
        $this->validator = $validator;
        $this->entityManager = $entityManager;
        $this->translator = $translator;
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

        $recordsPerPage = 5;
        $pageCurrent = $filters['page'];
        $startRecord = --$pageCurrent * $recordsPerPage;

        $data = $this->carRepository->findFilterAndSortingCars($filters, $startRecord, $recordsPerPage);

        $carsCount = $this->carRepository->findCountOfFilteredCars($filters);
        $pageCount = ceil($carsCount / 5);

        return $this->view(
            [
                'page_current' => $filters['page'],
                'page_count' => $pageCount,
                'cars_count' => $carsCount,
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
     * @Rest\Get("/models/all", name="api_models_all")
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
     * @param int $brandId
     * @return View
     */
    public function getAllModelsByBrandIdAction(int $brandId): View
    {
        if ($this->modelRepository->findCountOfRecords($brandId) <= 0) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('brand.not_exists')
                ],
                Response::HTTP_NOT_FOUND
            );
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
     * @throws \Exception
     */
    public function postNewReservationAction(Request $request): View
    {
        $reservation = $request->getContent('reservation');
        $reservation = json_decode($reservation)->reservation;

        $dateFrom = new \DateTime($reservation->date_from);
        $dateUntil = new \DateTime($reservation->date_until);

        //TODO: ši dada, jau yra rezervuota...

        $car = $this->carRepository->findOneBy(['id' => $reservation->carId]);

        if ($car === null) {
            return $this->view(
                [
                    'status' => 'error',
                    'messages' => $this->translator->trans('car.not_exists')
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $user = new User();
        $user->setPhone((int) $reservation->phone);
        $user->setEmail($reservation->email);
        $user->setName($reservation->name);  //todo: special html chars filter...

        $booking = new Booking();
        $booking->setCar($car);
        $booking->setUsers($user);
        $booking->setBookedFrom($dateFrom);
        $booking->setBookedUntil($dateUntil);
        $booking->setMessage($reservation->message); //todo: special html chars filter...
        $booking->setApproved(false);

        $validationUser = $this->validator->validate($user);
        $validationBooking = $this->validator->validate($booking);

        if (0 !== count($validationUser) || 0 !== count($validationBooking)) {
            return $this->view(
                [
                    'status' => 'error',
                    'messages' => $this->translator->trans('booking.insert.error')
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $this->entityManager->persist($user);
            $this->entityManager->persist($booking);

            $this->entityManager->flush();
        } catch (\Exception $exception) {
            $errorCode = rand(1000, 9999);
            // TODO: Išsiųsti el-paštą su tekstu:
                // Klaidos kodas: $errorCode
                // Kelias: /api/reservations
                // Klaidos žinutė: $exception->getMessage()

            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('system.unknown', ['code' => $errorCode])
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        return $this->view(
            [
                'status' => 'ok'
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Post("/report/car", name="api_report_car")
     * @param Request $request
     * @return View
     */
    public function postReportCarAction(Request $request): View
    {
        $carId = (int) $request->get('carId');
        $car = $this->carRepository->find($carId);

        if ($car === null) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('car.not_exists')
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        // $car
        // TODO: Išsiųsti el-paštą su linku į ją $carId

        return $this->view(
            [
                'status' => 'ok'
            ],
            Response::HTTP_OK
        );
    }
}
