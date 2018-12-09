<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SecurityControllerTest extends WebTestCase
{
    /**
     * @param $email
     * @param $password
     * @dataProvider getIncorrectLoginDataProvider
     */
    public function testLogin($email, $password): void
    {
        $client = static::createClient();

        $page = $client->request('GET', 'https://carbooking.projektai.nfqakademija.lt/admin');

        $this->assertSame(200, $client->getResponse()->getStatusCode());

        $loginButton = $page->selectButton('Prisijungti');
        $loginForm = $loginButton->form([
            '_email' => $email,
            '_password' => $password
        ]);

        $client->submit($loginForm);

        $client->followRedirect();

        $this->assertContains('Klaidingi duomenys!', $client->getResponse()->getContent());
    }

    public function getIncorrectLoginDataProvider()
    {
        return [
            ["testas@email.com", 'admin'],
            ["testas@gmail.com", ''],
            ["' or 1 = 1", ''],
            ['', "' or 1 = 1"],
            [-1, false],
            [true, PHP_INT_MAX]
        ];
    }
}
