<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class SecurityControllerTest extends  WebTestCase
{
    public function testLogin()
    {
        $client = static::createClient();
        $loginPage = $client->request('GET', '/admin');

        $this->assertSame(200, $client->getResponse()->getStatusCode());

        $loginButton = $loginPage->selectButton('security.login.homepage');
        $loginForm = $loginButton->form([
            'login[_username]' => 'carbookinglt@email.com',
            'login[_password]' => 'admin'
        ]);
        $client->submit($loginForm);

        $redirect = $client->followRedirect();
        $this->assertContains('admin.logout', $client->getResponse()->getContent());

        $logoutLink = $redirect
            ->filter('a:contains("admin.logout")')
            ->link();
        $client->click($logoutLink);
        $client->followRedirect();
        $this->assertContains('Prisijungti', $client->getResponse()->getContent());
    }
}
