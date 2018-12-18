<?php

namespace App\Mailer;

use App\Entity\Booking;
use App\Entity\Car;
use App\Entity\Subscriber;
use App\Entity\User;

class Mailer
{
    /**
     * @var \Swift_Mailer
     */
    private $mailer;
    /**
     * @var \Twig_Environment
     */
    private $twig;


    /**
     * Mailer constructor.
     * @param \Swift_Mailer $mailer
     * @param \Twig_Environment $twig
     */
    public function __construct(\Swift_Mailer $mailer, \Twig_Environment $twig)
    {
        $this->mailer = $mailer;
        $this->twig = $twig;
    }

    /**
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendEmail(): void
    {
        $body = $this->twig->render('email/main.html.twig', [
            'test' => 'test2'
        ]);

        $message = (new \Swift_Message('Hello Email'))
            ->setFrom(['carbookinglt@gmail.com' => 'CarBooking'])
            ->setTo('programeriss@gmail.com')
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }

    /**
     * @param int $errorCode
     * @param string $errorRoute
     * @param string $errorMessage
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendErrorEmail(int $errorCode, string $errorRoute, string $errorMessage): void
    {
        $body = $this->twig->render('email/error_unknown.html.twig', [
            'errorCode' => $errorCode,
            'errorRoute' => $errorRoute,
            'errorMessage' => $errorMessage
        ]);

        $message = (new \Swift_Message('Nenumatyta klaida!'))
            ->setFrom(['carbookinglt@gmail.com' => 'CarBooking'])
            ->setTo('carbookinglt@gmail.com')
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }

    /**
     * @param Car $car
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendReportCarEmail(Car $car)
    {
        $body = $this->twig->render('email/report_car.html.twig', [
            'car' => $car
        ]);

        $message = (new \Swift_Message('Netinkamas skelbimas!'))
            ->setFrom(['carbookinglt@gmail.com' => 'CarBooking'])
            ->setTo('carbookinglt@gmail.com')
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }

    /**
     * @param Subscriber $subscriber
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendEmailForSuccessfullySubscribe(Subscriber $subscriber)
    {
        $body = $this->twig->render('email/subscribeFirstTime.html.twig', [
            'subscriber' => $subscriber
        ]);

        $message = (new \Swift_Message('Sėkmingai užsiprenumeravote!'))
            ->setFrom(['carbookinglt@gmail.com' => 'CarBooking'])
            ->setTo($subscriber->getEmail())
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }

    /**
     * @param Subscriber $subscriber
     * @param Car $car
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendEmailSubscriber(Subscriber $subscriber, Car $car)
    {
        $body = $this->twig->render('email/subscriber.html.twig', [
            'subscriber' => $subscriber,
            'car' => $car
        ]);

        $message = (new \Swift_Message('Įkeltas naujas automobilis, kurio ieškojote!'))
            ->setFrom(['carbookinglt@gmail.com' => 'CarBooking'])
            ->setTo($subscriber->getEmail())
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }

    /**
     * @param Car $car
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendEmailOwner(Car $car)
    {
        $body = $this->twig->render('email/car_owner.html.twig', [
            'car' => $car
        ]);

        $message = (new \Swift_Message('Sėkmingai įkeltas Jūsų automobilis!'))
            ->setFrom(['carbookinglt@gmail.com' => 'CarBooking'])
            ->setTo($car->getUser()->getEmail())
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }

    /**
     * @param Car $car
     * @param User $user
     * @param Booking $booking
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendEmailForSuccessfullyReservation(Car $car, User $user, Booking $booking)
    {
        $body = $this->twig->render('email/successfully_reservation.html.twig', [
            'user' => $user,
            'car' => $car,
            'booking' => $booking
        ]);

        $message = (new \Swift_Message('Rezervacija atlikta sėkmingai!'))
            ->setFrom(['carbookinglt@gmail.com' => 'CarBooking'])
            ->setTo($user->getEmail())
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }

    /**
     * @param User $user
     * @param Booking $booking
     * @param Car $car
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendEmailForReservationApproved(User $user, Booking $booking, Car $car)
    {
        $body = $this->twig->render('email/reservation_approve.html.twig', [
            'booking' => $booking,
            'user' => $user,
            'car' => $car
        ]);

        $message = (new \Swift_Message('Patvirtinkite rezervaciją!'))
            ->setFrom(['carbookinglt@gmail.com' => 'CarBooking'])
            ->setTo($car->getUser()->getEmail())
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }

    /**
     * @param Booking $booking
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public function sendEmailForNotApprovedReservation(Booking $booking)
    {
        $body = $this->twig->render('email/reservation_not_approved.html.twig', [
            'booking' => $booking
        ]);

        $message = (new \Swift_Message('Rezervacija nepatvirtinta!'))
            ->setFrom(['carbookinglt@gmail.com' => 'CarBooking'])
            ->setTo($booking->getUser()->getEmail())
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }
}
