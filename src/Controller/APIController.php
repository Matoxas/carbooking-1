<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Entity\Car;
use App\Entity\Comment;
use App\Entity\Image;
use App\Entity\Renting;
use App\Entity\Subscriber;
use App\Entity\User;
use App\Mailer\Mailer;
use App\Repository\BrandRepository;
use App\Repository\CarRepository;
use App\Repository\CityRepository;
use App\Repository\CommentRepository;
use App\Repository\ModelRepository;
use App\Repository\SubscriberRepository;
use App\Security\TokenGenerator;
use App\Service\BookingService;
use App\Service\RentingService;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\Annotations as Rest;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\View\View;
use Symfony\Component\HttpFoundation\File\UploadedFile;
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
     * @var Mailer
     */
    private $mailer;
    /**
     * @var TokenGenerator
     */
    private $tokenGenerator;
    /**
     * @var SubscriberRepository
     */
    private $subscriberRepository;

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
     * @param Mailer $mailer
     * @param TokenGenerator $tokenGenerator
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
        RentingService $rentingService,
        Mailer $mailer,
        TokenGenerator $tokenGenerator,
        SubscriberRepository $subscriberRepository
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
        $this->mailer = $mailer;
        $this->tokenGenerator = $tokenGenerator;
        $this->subscriberRepository = $subscriberRepository;
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

        $reservation->phone = $this->formatPhoneNumber($reservation->phone);

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
            $this->mailer->sendErrorEmail($errorCode, '/api/reservations', $exception->getMessage());

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

        $car->setConfirmed(false);

        $this->entityManager->persist($car);
        $this->entityManager->flush();

        $this->mailer->sendReportCarEmail($car);

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
            $this->mailer->sendErrorEmail($errorCode, '/api/reservations', $exception->getMessage());

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
     * @Rest\Post("/new/subscribe", name="api_subscribe_new")
     * @param Request $request
     * @return View
     * @throws \Exception
     */
    public function postNewSubscribeAction(Request $request): View
    {
        $email = $request->get('email');
        $filters = $request->get('filters');

        $subscribe = new Subscriber();
        $subscribe->setEmail($email);

        if ($filters['location'] != '' && is_numeric($filters['location'])) {
            $city = $this->cityRepository->find($filters['location']);
            $subscribe->setCity($city);
        }

        if ($filters['brand'] != '' && is_numeric($filters['brand'])) {
            $brand = $this->brandRepository->find($filters['brand']);
            $subscribe->setBrand($brand);
        }

        if ($filters['model'] != '' && is_numeric($filters['model'])) {
            $model = $this->modelRepository->find($filters['model']);
            $subscribe->setModel($model);
        }

        if ($filters['price_from'] != '' && is_numeric($filters['price_from'])) {
            $subscribe->setPriceFrom($filters['price_from']);
        }

        if ($filters['price_until'] != '' && is_numeric($filters['price_until'])) {
            $subscribe->setPriceUntil($filters['price_until']);
        }

        if ($filters['date_from'] != '') {
            $dateFrom = new \DateTime($filters['date_from']);
            $subscribe->setDateFrom($dateFrom);
        }

        if ($filters['date_until'] != '') {
            $dateUntil = new \DateTime($filters['date_until']);
            $subscribe->setDateUntil($dateUntil);
        }

        $validationSubscribe = $this->validator->validate($subscribe);

        if (0 !== count($validationSubscribe)) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('subscribe.insert.error')
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $this->entityManager->persist($subscribe);

            $this->entityManager->flush();
        } catch (\Exception $exception) {
            $errorCode = rand(1000, 9999);
            $this->mailer->sendErrorEmail($errorCode, '/api/new/subscribe', $exception->getMessage());

            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('system.unknown', ['code' => $errorCode])
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        $this->mailer->sendEmailForSucessufullySubscribe($subscribe);

        return $this->view(
            [
                'status' => 'ok'
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Get("/reservation/{hash}", name="api_reservation_info")
     * @return View
     */
    public function getReservationInfoAction(string $hash): View
    {
        return $this->view(
            [
                'status' => 'ok',
                'message' => 'Jūs el-paštas patvirtintas! Visa reikalinga informacija el-paštu išsiųsta!'. $hash
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Post("/new/car", name="api_car_new")
     * @param Request $request
     * @return View
     * @throws \Exception
     */
    public function postNewCarAction(Request $request): View
    {
        $phone = $this->formatPhoneNumber($request->get('phone'));
        $from = new \DateTime($request->get('date_from'));
        $until = new \DateTime($request->get('date_until'));

        $user = new User();
        $user->setName($request->get('name'));
        $user->setEmail($request->get('email'));
        $user->setPhone($phone);

        $city = $this->cityRepository->find($request->get('city'));
        $model = $this->modelRepository->find($request->get('model'));
        $brand = $this->brandRepository->find($request->get('brand'));

        $car = new Car();
        $car->setUser($user);
        $car->setConfirmed(true);
        $car->setPublish(true);
        $car->setCity($city);
        $car->setModel($model);
        $car->setBrand($brand);
        $car->setAddress($request->get('address'));
        $car->setPrice($request->get('price'));
        $car->setDescription($request->get('description'));

        $renting = new Renting();
        $renting->setRentedFrom($from);
        $renting->setRentedUntil($until);
        $renting->setCar($car);

        $validationUser = $this->validator->validate($user);
        $validationCar = $this->validator->validate($car);
        $validationRenting = $this->validator->validate($renting);

        if (0 !== count($validationUser) || 0 !== count($validationCar) || 0 !== count($validationRenting)) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('car.not_valid')
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        if (count($request->files->all()['image']) == 0) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('car.not_valid_image')
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $this->entityManager->persist($user);
        $this->entityManager->persist($car);
        $this->entityManager->persist($renting);

        $error = $this->uploadImages($request, $car);

        if ($error !== null) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans($error)
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            $errorCode = rand(1000, 9999);
            $this->mailer->sendErrorEmail($errorCode, '/api/new/car', $exception->getMessage());

            return $this->view(
                [
                    'status' => 'error',
                    'message' => $this->translator->trans('system.unknown', ['code' => $errorCode])
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        $this->sendEmailSubscribers($car, $renting);

        return $this->view(
            [
                'status' => 'ok',
                'carId' => $car->getId()
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @param Request $request
     * @param Car $car
     * @return string
     */
    private function uploadImages(Request $request, Car $car): ?string
    {
        $message = null;
        $images = $request->files->get('image');

        /** @var UploadedFile $image */
        foreach ($images as $image) {
            $imgName = $this->tokenGenerator->getRandomSecureToken(30) . '.' . $image->guessExtension();

            $message = $this->uploadImage($image, $imgName);

            if ($message === null) {
                $image = new Image();
                $image->setImage($imgName);
                $image->setCar($car);
                $this->entityManager->persist($image);
                $this->entityManager->flush();
            }
        }

        return $message;
    }

    /**
     * Upload one image
     * @param UploadedFile $image
     * @param string $imgName
     * @return string|null
     */
    private function uploadImage(UploadedFile $image, string $imgName): ?string
    {
        $imageFileType = $image->guessExtension();

        if ($image->getSize() > 10000000) {
            return $this->translator->trans('upload.image.size');
        }

        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
            return $this->translator->trans('upload.image.wrong_format');
        }

        try {
            $image->move("uploads/", $imgName);
        } catch (\Exception $exception) {
            return $this->translator->trans('upload.image.unknown');
        }

        return null;
    }

    /**
     * @param string $phone
     * @return int
     */
    private function formatPhoneNumber(string $phone): int
    {
        $phone = str_replace('+370', '', $phone);
        if (strlen($phone) == 9) {
            $phone = substr($phone, 1);
        }

        return $phone;
    }

    /**
     * @param Car $car
     * @param Renting $renting
     */
    private function sendEmailSubscribers(Car $car, Renting $renting): void
    {
        $subscribers = $this->subscriberRepository->findAll();

        /** @var Subscriber $subscriber */
        foreach ($subscribers as $subscriber) {
            if ($subscriber->getPriceFrom() > $car->getPrice()) {
                continue;
            }

            if ($subscriber->getPriceUntil() < $car->getPrice()) {
                continue;
            }

            if ($subscriber->getCity() !== null && $subscriber->getCity()->getId() != $car->getCity()->getId()) {
                continue;
            }

            if ($subscriber->getBrand() !== null && $subscriber->getBrand()->getId() != $car->getBrand()->getId()) {
                continue;
            }

            if ($subscriber->getModel() !== null && $subscriber->getModel()->getId() != $car->getModel()->getId()) {
                continue;
            }

            if ($subscriber->getDateFrom() !== null &&
                $subscriber->getDateFrom()->format('Y-m-d') < $renting->getRentedFrom()->format('Y-m-d')) {
                continue;
            }

            if ($subscriber->getDateUntil() !== null &&
                $subscriber->getDateUntil()->format('Y-m-d') < $renting->getRentedUntil()->format('Y-m-d')) {
                continue;
            }

            $this->mailer->sendEmailSubscriber($subscriber, $car);
        }
    }
}
