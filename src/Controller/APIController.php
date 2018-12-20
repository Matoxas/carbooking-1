<?php

namespace App\Controller;

use App\Entity\Booking;
use App\Entity\Brand;
use App\Entity\Car;
use App\Entity\City;
use App\Entity\Comment;
use App\Entity\Image;
use App\Entity\Model;
use App\Entity\Renting;
use App\Entity\Subscriber;
use App\Entity\User;
use App\Mailer\Mailer;
use App\Security\TokenGenerator;
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

        $carRepository = $this->getDoctrine()->getRepository(Car::class);

        $carsCount = $carRepository->findCountOfFilteredCars($filters);
        $pageCount = ceil($carsCount / $recordsPerPage);

        if ($filters['page'] == 'all') {
            $recordsPerPage = null;
            $pageCount = 1;
        }

        $data = $carRepository->findFilterAndSortingCars($filters, $startRecord, $recordsPerPage);

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
            [
                'data' => $this->getDoctrine()->getRepository(Car::class)->find($carId)
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Get("/get/car/{token}", name="api_car_token")
     * @param string $token
     * @return View
     */
    public function getCarByTokenAction(string $token): View
    {
        return $this->view(
            [
                'token' => $token,
                'data' => $this->getDoctrine()->getRepository(Car::class)->findBy(['token' => $token])
            ],
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
            [
                'data' => $this->getDoctrine()->getRepository(Brand::class)->findAll()
            ],
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
            [
                'data' => $this->getDoctrine()->getRepository(Model::class)->findAll()
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Get("/models/{brandId}", name="api_models_brandId")
     * @param TranslatorInterface $translator
     * @param int $brandId
     * @return View
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function getAllModelsByBrandIdAction(TranslatorInterface $translator, int $brandId): View
    {
        $brandRepository = $this->getDoctrine()->getRepository(Brand::class);
        $modelRepository = $this->getDoctrine()->getRepository(Model::class);

        if ($modelRepository->findCountOfRecords($brandId) <= 0) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('brand.not_exists')
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        return $this->view(
            [
                'id' => $brandId,
                'brand' => $brandRepository->find($brandId)->getBrand(),
                'data' => $modelRepository->findBy(['brand' => $brandId])
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
            [
                'data' => $this->getDoctrine()->getRepository(City::class)->findAll()
            ],
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
            [
                'data' => $this->getDoctrine()->getRepository(City::class)->findAllCitiesWithCars()
            ],
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
        $data = $this->getDoctrine()->getRepository(Comment::class)
            ->findBy(['car' => $carId], ['createdAt' => 'DESC']);

        return $this->view(
            [
                'carId' => $carId,
                'data' => $data
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Post("/new/reservation", name="api_reservation_new")
     * @param Request $request
     * @param TranslatorInterface $translator
     * @param ValidatorInterface $validator
     * @param Mailer $mailer
     * @return View
     * @throws \Exception
     */
    public function postNewReservationAction(
        Request $request,
        TranslatorInterface $translator,
        ValidatorInterface $validator,
        Mailer $mailer
    ): View {
        $reservation = $request->getContent('reservation');
        $reservation = json_decode($reservation)->reservation;

        $dateFrom = new \DateTime($reservation->date_from);
        $dateUntil = new \DateTime($reservation->date_until);

        $reservation->name = htmlspecialchars($reservation->name);
        $reservation->message = htmlspecialchars($reservation->message);

        $reservation->phone = $this->formatPhoneNumber($reservation->phone);

        $car = $this->getDoctrine()->getRepository(Car::class)->findOneBy(['id' => $reservation->carId]);

        if ($car === null) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('car.not_exists')
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

        $validationUser = $validator->validate($user);
        $validationBooking = $validator->validate($booking);

        if (0 !== count($validationUser) || 0 !== count($validationBooking)) {
            $errorLine = (string) $validationUser . (string) $validationBooking;
            $mailer->sendErrorEmail(rand(1000, 9999), '/api/new/reservation', $errorLine);

            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('booking.insert.error')
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $this->getDoctrine()->getManager()->persist($user);
            $this->getDoctrine()->getManager()->persist($booking);

            $this->getDoctrine()->getManager()->flush();
        } catch (\Exception $exception) {
            $errorCode = rand(1000, 9999);
            $mailer->sendErrorEmail($errorCode, '/api/new/reservation', $exception->getMessage());

            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('system.unknown', ['code' => $errorCode])
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        $mailer->sendEmailForReservationApproved($user, $booking, $car);

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
     * @param TranslatorInterface $translator
     * @param Mailer $mailer
     * @return View
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function postReportCarAction(Request $request, TranslatorInterface $translator, Mailer $mailer): View
    {
        $carId = (int) $request->get('carId');
        $car = $this->getDoctrine()->getRepository(Car::class)->find($carId);

        if ($car === null) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('car.not_exists')
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        $car->setConfirmed(false);

        $this->getDoctrine()->getManager()->persist($car);
        $this->getDoctrine()->getManager()->flush();

        $mailer->sendReportCarEmail($car);

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
     * @param TranslatorInterface $translator
     * @param ValidatorInterface $validator
     * @param Mailer $mailer
     * @return View
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function postNewCommentAction(
        Request $request,
        TranslatorInterface $translator,
        ValidatorInterface $validator,
        Mailer $mailer
    ): View {
        $commentData = $request->getContent('comment');
        $commentData = json_decode($commentData)->comment;

        $car = $this->getDoctrine()->getRepository(Car::class)->find($commentData->carId);

        if ($car === null) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('car.not_exists')
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        $comment = new Comment();
        $comment->setCar($car);
        $comment->setName($commentData->name);
        $comment->setComment($commentData->text);

        $validationComment = $validator->validate($comment);

        if (0 !== count($validationComment)) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('comment.bad_data')
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        try {
            $this->getDoctrine()->getManager()->persist($comment);

            $this->getDoctrine()->getManager()->flush();
        } catch (\Exception $exception) {
            $errorCode = rand(1000, 9999);
            $mailer->sendErrorEmail($errorCode, '/api/reservations', $exception->getMessage());

            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('system.unknown', ['code' => $errorCode])
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
     * @param TranslatorInterface $translator
     * @param ValidatorInterface $validator
     * @param Mailer $mailer
     * @return View
     * @throws \Exception
     */
    public function postNewSubscribeAction(
        Request $request,
        TranslatorInterface $translator,
        ValidatorInterface $validator,
        Mailer $mailer
    ): View {
        $email = $request->get('email');
        $filters = $request->get('filters');

        $subscribe = new Subscriber();
        $subscribe->setEmail($email);

        $city = $this->getDoctrine()->getRepository(City::class)->find($filters['location']);
        $subscribe->setCity($city);
        $brand = $this->getDoctrine()->getRepository(Brand::class)->find($filters['brand']);
        $subscribe->setBrand($brand);
        $model = $this->getDoctrine()->getRepository(Model::class)->find($filters['model']);
        $subscribe->setModel($model);
        $subscribe->setPriceFrom($filters['price_from']);
        $subscribe->setPriceUntil($filters['price_until']);

        if ($filters['date_from'] != '') {
            $dateFrom = new \DateTime($filters['date_from']);
            $subscribe->setDateFrom($dateFrom);
        }

        if ($filters['date_until'] != '') {
            $dateUntil = new \DateTime($filters['date_until']);
            $subscribe->setDateUntil($dateUntil);
        }

        $validationSubscribe = $validator->validate($subscribe);

        if (0 !== count($validationSubscribe)) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('subscribe.insert.error')
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $this->getDoctrine()->getManager()->persist($subscribe);

            $this->getDoctrine()->getManager()->flush();
        } catch (\Exception $exception) {
            $errorCode = rand(1000, 9999);
            $mailer->sendErrorEmail($errorCode, '/api/new/subscribe', $exception->getMessage());

            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('system.unknown', ['code' => $errorCode])
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        $mailer->sendEmailForSuccessfullySubscribe($subscribe);

        return $this->view(
            [
                'status' => 'ok'
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Get("/reservation/{token}/not_approved", name="api_reservation_not_approved")
     * @param TranslatorInterface $translator
     * @param string $token
     * @param Mailer $mailer
     * @return View
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function getReservationNotApproveAction(TranslatorInterface $translator, string $token, Mailer $mailer): View
    {
        /** @var Booking $booking */
        $booking = $this->getDoctrine()->getRepository(Booking::class)->findOneBy(['token' => $token]);

        if (empty($booking) || $booking->getApproved()) {
            return $this->view(
                [
                    'status' => 'ok',
                    'message' => $translator->trans('booking.not_approved')
                ],
                Response::HTTP_OK
            );
        }

        $mailer->sendEmailForNotApprovedReservation($booking);

        $this->getDoctrine()->getManager()->remove($booking->getUsers());
        $this->getDoctrine()->getManager()->remove($booking);
        $this->getDoctrine()->getManager()->flush();

        return $this->view(
            [
                'status' => 'ok',
                'message' => $translator->trans('booking.not_approved_success')
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Get("/reservation/{token}", name="api_reservation_approve")
     * @param TranslatorInterface $translator
     * @param string $token
     * @param Mailer $mailer
     * @return View
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function getReservationApproveAction(TranslatorInterface $translator, string $token, Mailer $mailer): View
    {
        $booking = $this->getDoctrine()->getRepository(Booking::class)->findBy(['token' => $token]);

        if (empty($booking)) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('booking.token_is_expired')
                ],
                Response::HTTP_OK
            );
        }

        if ($booking[0]->getApproved()) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('booking.token_is_used')
                ],
                Response::HTTP_OK
            );
        }

        $bookingData = $booking[0]->setApproved(true);
        $this->getDoctrine()->getManager()->persist($bookingData);
        $this->getDoctrine()->getManager()->flush();

        $carOwner = $booking[0]->getCar();
        $bookingUser = $booking[0]->getUsers();

        $mailer->sendEmailForSuccessfullyReservation($carOwner, $bookingUser, $booking[0]);

        return $this->view(
            [
                'status' => 'ok',
                'message' => $translator->trans('booking.success')
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Post("/new/car", name="api_car_new")
     * @param Request $request
     * @param TranslatorInterface $translator
     * @param ValidatorInterface $validator
     * @param Mailer $mailer
     * @param TokenGenerator $tokenGenerator
     * @return View
     * @throws \Exception
     */
    public function postNewCarAction(
        Request $request,
        TranslatorInterface $translator,
        ValidatorInterface $validator,
        Mailer $mailer,
        TokenGenerator $tokenGenerator
    ): View {
        $phone = $this->formatPhoneNumber($request->get('phone'));
        $from = new \DateTime($request->get('date_from'));
        $until = new \DateTime($request->get('date_until'));

        $user = new User();
        $user->setName($request->get('name'));
        $user->setEmail($request->get('email'));
        $user->setPhone($phone);

        $city = $this->getDoctrine()->getRepository(City::class)->find($request->get('city'));
        $model = $this->getDoctrine()->getRepository(Model::class)->find($request->get('model'));
        $brand = $this->getDoctrine()->getRepository(Brand::class)->find($request->get('brand'));

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

        $validationUser = $validator->validate($user);
        $validationCar = $validator->validate($car);
        $validationRenting = $validator->validate($renting);

        if (0 !== count($validationUser) ||
            0 !== count($validationCar) ||
            0 !== count($validationRenting) ||
            0 == count($request->files->all()['image'])
        ) {
            $errorLine = (string) $validationUser . (string) $validationCar . (string) $validationRenting;
            $mailer->sendErrorEmail(rand(1000, 9999), '/api/new/car', $errorLine);

            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('car.not_valid')
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $this->getDoctrine()->getManager()->persist($user);
        $this->getDoctrine()->getManager()->persist($car);
        $this->getDoctrine()->getManager()->persist($renting);

        $error = $this->uploadImages($request, $car, $translator, $tokenGenerator, $mailer);

        if ($error !== null) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans($error)
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        try {
            $this->getDoctrine()->getManager()->flush();
        } catch (\Exception $exception) {
            $errorCode = rand(1000, 9999);
            $mailer->sendErrorEmail($errorCode, '/api/new/car', $exception->getMessage());

            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('system.unknown', ['code' => $errorCode])
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        $mailer->sendEmailOwner($car);
        $this->sendEmailSubscribers($car, $renting, $mailer);

        return $this->view(
            [
                'status' => 'ok',
                'carId' => $car->getId()
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Post("/edit/car/{token}", name="api_car_new")
     * @param Request $request
     * @param string $token
     * @param TranslatorInterface $translator
     * @param Mailer $mailer
     * @param ValidatorInterface $validator
     * @param TokenGenerator $tokenGenerator
     * @return View
     * @throws \Exception
     */
    public function putEditCarAction(
        Request $request,
        string $token,
        TranslatorInterface $translator,
        Mailer $mailer,
        ValidatorInterface $validator,
        TokenGenerator $tokenGenerator
    ): View {
        $car = $this->getDoctrine()->getRepository(Car::class)->findOneBy(['token' => $token]);
        if (empty($car) || strlen($request->get('phone')) < 6) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('car.request_error')
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        $phone = $this->formatPhoneNumber((string) $request->get('phone'));
        $from = new \DateTime($request->get('date_from'));
        $until = new \DateTime($request->get('date_until'));

        /** @var User $user */
        $user = $car->getUser();
        $user->setName($request->get('name'));
        $user->setEmail($request->get('email'));
        $user->setPhone($phone);

        $city = $this->getDoctrine()->getRepository(City::class)->find($request->get('city'));

        $car->setUser($user);
        $car->setCity($city);
        $car->setAddress($request->get('address'));
        $car->setPrice($request->get('price'));
        $car->setDescription($request->get('description'));

        /** @var Renting $renting */
        foreach ($car->getRenting()->toArray() as $renting) {
            $this->getDoctrine()->getManager()->remove($renting);
        }

        $renting = new Renting();
        $renting->setRentedFrom($from);
        $renting->setRentedUntil($until);
        $renting->setCar($car);

        $bookings = $request->get('bookingDates');
        $this->removeCarBookingDates($bookings, $car, $mailer);

        $validationUser = $validator->validate($user);
        $validationCar = $validator->validate($car);
        $validationRenting = $validator->validate($renting);

        if (0 !== count($validationUser) || 0 !== count($validationCar) || 0 !== count($validationRenting)) {
            $errorLine = (string) $validationUser . (string) $validationCar . (string) $validationRenting;
            $mailer->sendErrorEmail(rand(1000, 9999), '/api/edit/car', $errorLine);

            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('car.not_valid')
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        $this->getDoctrine()->getManager()->persist($user);
        $this->getDoctrine()->getManager()->persist($car);
        $this->getDoctrine()->getManager()->persist($renting);

        $error = $this->updateEditCarPhotos($request, $tokenGenerator, $translator, $car, $mailer);
        if ($error !== null) {
            return $error;
        }

        try {
            $this->getDoctrine()->getManager()->flush();
        } catch (\Exception $exception) {
            $errorCode = rand(1000, 9999);
            $mailer->sendErrorEmail($errorCode, '/api/edit/car', $exception->getMessage());

            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('system.unknown', ['code' => $errorCode])
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        return $this->view(
            [
                'status' => 'ok',
                'carId' => $car->getId()
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @Rest\Put("/delete/car/{token}", name="api_car_new")
     * @param string $token
     * @param TranslatorInterface $translator
     * @param Mailer $mailer
     * @return View
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function putDeleteCarAction(string $token, TranslatorInterface $translator, Mailer $mailer): View
    {
        $car = $this->getDoctrine()->getRepository(Car::class)->findOneBy(['token' => $token]);

        if ($car == null || empty($car)) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('car.not_exists')
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        /** @var Renting $renting */
        foreach ($car->getRenting()->toArray() as $renting) {
            $this->getDoctrine()->getManager()->remove($renting);
        }

        /** @var Image $image */
        foreach ($car->getImages()->toArray() as $image) {
            unlink($image->getImage());
            $this->getDoctrine()->getManager()->remove($image);
        }

        /** @var Booking $booking */
        foreach ($car->getBookings()->toArray() as $booking) {
            $this->getDoctrine()->getManager()->remove($booking);
        }

        /** @var Comment $comment */
        foreach ($car->getComments()->toArray() as $comment) {
            $this->getDoctrine()->getManager()->remove($comment);
        }

        /** @var User $user */
        $user = $car->getUser();

        try {
            $this->getDoctrine()->getManager()->remove($car);
            $this->getDoctrine()->getManager()->flush();
        } catch (\Exception $exception) {
            $errorCode = rand(1000, 9999);
            $mailer->sendErrorEmail($errorCode, '/api/delete/car/{token}', $exception->getMessage());

            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans('system.unknown', ['code' => $errorCode])
                ],
                Response::HTTP_NOT_FOUND
            );
        }

        $userCars = $this->getDoctrine()->getRepository(Car::class)->findBy(['user' => $user]);
        $userCarsCount = count($userCars);

        if ($userCarsCount == 0) {
            $this->getDoctrine()->getManager()->remove($user);
        }

        $this->getDoctrine()->getManager()->flush();

        return $this->view(
            [
                'status' => 'ok'
            ],
            Response::HTTP_OK
        );
    }

    /**
     * @param Request $request
     * @param Car $car
     * @param TranslatorInterface $translator
     * @param TokenGenerator $tokenGenerator
     * @param Mailer $mailer
     * @return string
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    private function uploadImages(
        Request $request,
        Car $car,
        TranslatorInterface $translator,
        TokenGenerator $tokenGenerator,
        Mailer $mailer
    ): ?string {
        $message = null;
        $images = $request->files->get('image');

        if ($images == null) {
            return $message;
        }

        foreach ($images as $image) {
            if (!$image instanceof UploadedFile) {
                continue;
            }

            $imgName = $tokenGenerator->getRandomSecureToken(30) . '.' . $image->guessExtension();

            $message = $this->uploadImage($translator, $image, $imgName);

            if ($message === null) {
                $image = new Image();
                $image->setImage($imgName);
                $image->setCar($car);
                $this->getDoctrine()->getManager()->persist($image);

                try {
                    $this->getDoctrine()->getManager()->flush();
                } catch (\Exception $exception) {
                    $errorCode = rand(1000, 9999);
                    $mailer->sendErrorEmail($errorCode, '/api/new/car', $exception->getMessage());

                    $message = $translator->trans('system.unknown', ['code' => $errorCode]);
                }
            }
        }

        return $message;
    }

    /**
     * Upload one image
     * @param TranslatorInterface $translator
     * @param UploadedFile $image
     * @param string $imgName
     * @return string|null
     */
    private function uploadImage(TranslatorInterface $translator, UploadedFile $image, string $imgName): ?string
    {
        $imageFileType = $image->guessExtension();

        if ($image->getSize() > 10000000) {
            return $translator->trans('upload.image.size');
        }

        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
            return $translator->trans('upload.image.wrong_format');
        }

        try {
            $image->move("uploads/", $imgName);
        } catch (\Exception $exception) {
            return $translator->trans('upload.image.unknown');
        }

        return null;
    }

    /**
     * @param string $phone
     * @return string
     */
    private function formatPhoneNumber(string $phone): string
    {
        if (preg_match('/^\+?(\d{3})\D?\D?(\d{3})\D?(\d{5})$/', $phone) == true) {
            return $phone;
        }

        return '';
    }

    /**
     * @param Car $car
     * @param Renting $renting
     * @param Mailer $mailer
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    private function sendEmailSubscribers(Car $car, Renting $renting, Mailer $mailer): void
    {
        $subscribers = $this->getDoctrine()->getRepository(Subscriber::class)
            ->findFilteredSubscribers($car, $renting);

        /** @var Subscriber $subscriber */
        foreach ($subscribers as $subscriber) {
            $mailer->sendEmailSubscriber($subscriber, $car);
        }
    }

    /**
     * @param Request $request
     * @param TokenGenerator $tokenGenerator
     * @param TranslatorInterface $translator
     * @param Car $car
     * @param Mailer $mailer
     * @return View|null
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    private function updateEditCarPhotos(
        Request $request,
        TokenGenerator $tokenGenerator,
        TranslatorInterface $translator,
        Car $car,
        Mailer $mailer
    ): ?View {
        $images = $request->get('image');
        $imagesDB = $this->getDoctrine()->getRepository(Image::class)->findBy(['car' => $car]);

        foreach ($imagesDB as $imageDB) {
            $path = $imageDB->getImage();

            if (!@in_array('/' . $path, $images)) {
                @unlink($path);
                $this->getDoctrine()->getManager()->remove($imageDB);
            }
        }

        $error = $this->uploadImages($request, $car, $translator, $tokenGenerator, $mailer);

        if (count($car->getImages()->toArray()) == 0 && $error !== null) {
            return $this->view(
                [
                    'status' => 'error',
                    'message' => $translator->trans($error)
                ],
                Response::HTTP_BAD_REQUEST
            );
        }

        return null;
    }

    /**
     * @param $bookings
     * @param $car
     * @param Mailer $mailer
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    private function removeCarBookingDates($bookings, $car, Mailer $mailer): void
    {
        $bookingsDB = $this->getDoctrine()->getRepository(Booking::class)->findBy(['car' => $car]);

        $bookings = json_decode($bookings);

        foreach ($bookingsDB as $bookingDB) {
            if (!@in_array($bookingDB->getId(), $bookings)) {
                $mailer->sendEmailForCanceledReservation($bookingDB);
                $this->getDoctrine()->getManager()->remove($bookingDB);
            }
        }
    }
}
