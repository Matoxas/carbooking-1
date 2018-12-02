<?php

namespace App\Mailer;

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
        $body = $this->twig->render('email/test.html.twig', [
            'test' => 'test2'
        ]);

        $message = (new \Swift_Message('Hello Email'))
            ->setFrom('carbookingLT@gmail.com')
            ->setTo('programeriss@gmail.com')
            ->setBody($body, 'text/html');

        $this->mailer->send($message);
    }
}
