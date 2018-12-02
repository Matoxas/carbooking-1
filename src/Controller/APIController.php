<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Entity\Comment;
use App\Entity\User;
use App\Repository\BrandRepository;
use App\Repository\CarRepository;
use App\Repository\CityRepository;
use App\Repository\CommentRepository;
use App\Repository\ModelRepository;
use App\Service\BookingService;
use App\Service\RentingService;
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
     * @var BookingService
     */
    private $bookingService;
    /**
     * @var RentingService
     */
    private $rentingService;

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
     * @param BookingService $bookingService
     * @param RentingService $rentingService
     */
    public function __construct(
        CityRepository $cityRepository,
        BrandRepository $brandRepository,
        ModelRepository $modelRepository,
        CarRepository $carRepository,
        CommentRepository $commentRepository,
        ValidatorInterface $validator,
        EntityManagerInterface $entityManager,
        TranslatorInterface $translator,
        BookingService $bookingService,
        RentingService $rentingService
    ) {
        $this->cityRepository = $cityRepository;
        $this->brandRepository = $brandRepository;
        $this->modelRepository = $modelRepository;
        $this->carRepository = $carRepository;
        $this->commentRepository = $commentRepository;
        $this->validator = $validator;
        $this->entityManager = $entityManager;
        $this->translator = $translator;
        $this->bookingService = $bookingService;
        $this->rentingService = $rentingService;
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
                'data' => $this->commentRepository->findBy(['car' => $carId], ['createdAt' => 'DESC'])
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Post("/new/reservation", name="api_reservation_new")
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

        $reservation->name = htmlspecialchars($reservation->name);
        $reservation->message = htmlspecialchars($reservation->message);

        $car = $this->carRepository->findOneBy(['id' => $reservation->carId]);

        if ($car === null) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('car.not_exists')
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        if (!$this->bookingService->isValidDate($dateFrom, $dateUntil)) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('booking.bad_date_format')
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        if (!$this->rentingService->isTimeAvailable($car->getId(), $dateFrom, $dateUntil)) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('renting.time_not_available')
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        if ($this->bookingService->isTimeReserved($car->getId(), $dateFrom, $dateUntil)) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('booking.date_is_reserved')
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $user = new User();
        $user->setPhone((int) $reservation->phone);
        $user->setEmail($reservation->email);
        $user->setName($reservation->name);

        $booking = new Booking();
        $booking->setCar($car);
        $booking->setUsers($user);
        $booking->setBookedFrom($dateFrom);
        $booking->setBookedUntil($dateUntil);
        $booking->setMessage($reservation->message);
        $booking->setApproved(false);

        $validationUser = $this->validator->validate($user);
        $validationBooking = $this->validator->validate($booking);

        if (0 !== count($validationUser) || 0 !== count($validationBooking)) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('booking.insert.error')
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

    /**
     * @Rest\Post("/new/comment", name="api_comment_new")
     * @param Request $request
     * @return View
     * @throws \Exception
     */
    public function postNewCommentAction(Request $request): View
    {
        $commentData = $request->getContent('comment');
        $commentData = json_decode($commentData)->comment;

        $car = $this->carRepository->find($commentData->carId);

        if ($car === null) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('car.not_exists')
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        $comment = new Comment();
        $comment->setCar($car);
        $comment->setName($commentData->name);
        $comment->setComment($commentData->text);

        $validationComment = $this->validator->validate($comment);

        if (0 !== count($validationComment)) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('comment.bad_data')
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        try {
            $this->entityManager->persist($comment);

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
     * @Rest\Post("/new/car", name="api_car_new")
     * @param Request $request
     * @return View
     */
    public function postNewCarAction(Request $request): View
    {
        foreach($_GET as $key => $value) {
            echo "GET parameter '$key' has '$value' <br/>";
        }
        foreach($_POST as $key => $value) {
            echo "POST parameter '$key' has '$value' <br/>";
        }
        foreach ($_FILES as $FILE) {
            var_dump($FILE);
        }
        // var_dump($_FILES['image']);
        //die;
        /*
                $target_dir = "uploads/";
                $target_file = $target_dir . basename($_FILES["image"]["name"]);
                $uploadOk = 1;
                $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        // Check if image file is a actual image or fake image
                if (isset($_POST["submit"])) {
                    $check = getimagesize($_FILES["image"]["tmp_name"]);
                    if ($check !== false) {
                        echo "File is an image - " . $check["mime"] . ".";
                        $uploadOk = 1;
                    } else {
                        echo "File is not an image.";
                        $uploadOk = 0;
                    }
                }
        // Check if file already exists
                if (file_exists($target_file)) {
                    echo "Sorry, file already exists.";
                    $uploadOk = 0;
                }
        // Check file size
                if ($_FILES["image"]["size"] > 500000) {
                    echo "Sorry, your file is too large.";
                    $uploadOk = 0;
                }
        // Allow certain file formats
                if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
                    && $imageFileType != "gif") {
                    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                    $uploadOk = 0;
                }
        // Check if $uploadOk is set to 0 by an error
                if ($uploadOk == 0) {
                    echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
                } else {
                    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                        echo "The file " . basename($_FILES["image"]["name"]) . " has been uploaded.";
                    } else {
                        echo "Sorry, there was an error uploading your file.";
                    }
                }
        */
        echo "<br/>";
        return $this->view(
            [
                'status' => 'ok',
                'message' => ''
            ],
            Response::HTTP_OK
        );
    }
}
