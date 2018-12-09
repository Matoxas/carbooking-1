<?php

namespace App\Mailer;

use App\Entity\Car;
use App\Entity\Subscriber;

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

    public function sendEmail(): void
    {
        $body = $this->twig->render('email/main.html.twig', [
            'test' => 'test2'
        ]);

        $message = (new \Swift_Message('Hello Email'))
            ->setFrom(['carbookinglt@gmail.com' => 'Car Booking'])
            ->setTo('programeriss@gmail.com')
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }

    public function sendErrorEmail(int $errorCode, string $errorRoute, string $errorMessage): void
    {
        $body = $this->twig->render('email/error_unknown.html.twig', [
            'errorCode' => $errorCode,
            'errorRoute' => $errorRoute,
            'errorMessage' => $errorMessage
        ]);

        $message = (new \Swift_Message('Nenumatyta klaida!'))
            ->setFrom(['carbookinglt@gmail.com' => 'Car Booking'])
            ->setTo('carbookinglt@gmail.com')
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }

    public function sendReportCarEmail(Car $car)
    {
        $body = $this->twig->render('email/report_car.html.twig', [
            'car' => $car
        ]);

        $message = (new \Swift_Message('Netinkamas skelbimas!'))
            ->setFrom(['carbookinglt@gmail.com' => 'Car Booking'])
            ->setTo('carbookinglt@gmail.com')
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }

    public function sendEmailForSucessufullySubscribe(Subscriber $subscriber)
    {
        $body = $this->twig->render('email/subscribeFirstTime.html.twig', [
            'subscriber' => $subscriber
        ]);

        $message = (new \Swift_Message('Sėkmingai užsiprenumeravote!'))
            ->setFrom(['carbookinglt@gmail.com' => 'Car Booking'])
            ->setTo($subscriber->getEmail())
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }

    public function sendEmailSubscriber(Subscriber $subscriber, Car $car)
    {
        $body = $this->twig->render('email/subscriber.html.twig', [
            'subscriber' => $subscriber,
            'car' => $car
        ]);

        $message = (new \Swift_Message('Įkeltas naujas automobilis, kurio ieškojote!'))
            ->setFrom(['carbookinglt@gmail.com' => 'Car Booking'])
            ->setTo($subscriber->getEmail())
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }
}
