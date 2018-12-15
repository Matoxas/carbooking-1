<?php

namespace App\Entity;

use App\Security\TokenGenerator;
use App\Validator\Constraints as MyAssert;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BookingRepository")
 * @ORM\HasLifecycleCallbacks()
 * @MyAssert\DateIsCorrect()
 * @MyAssert\DateIsAvailable()
 */
class Booking
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Car", inversedBy="bookings")
     */
    private $car;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\NotNull()
     * @Assert\NotBlank()
     * @MyAssert\DateIsInTheFuture()
     */
    private $bookedFrom;

    /**
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank()
     * @Assert\NotNull()
     * @MyAssert\DateIsInTheFuture()
     */
    private $bookedUntil;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="bookings")
     * @ORM\JoinColumn(nullable=false)
     */
    private $users;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $message;

    /**
     * @ORM\Column(type="boolean")
     */
    private $approved;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $token;

    /**
     * Booking constructor.
     */
    public function __construct()
    {
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCar(): ?Car
    {
        return $this->car;
    }

    public function setCar(?Car $car): self
    {
        $this->car = $car;

        return $this;
    }

    public function getBookedFrom(): ?\DateTimeInterface
    {
        return $this->bookedFrom;
    }

    public function setBookedFrom(\DateTimeInterface $bookedFrom): self
    {
        $this->bookedFrom = $bookedFrom;

        return $this;
    }

    public function getBookedUntil(): ?\DateTimeInterface
    {
        return $this->bookedUntil;
    }

    public function setBookedUntil(\DateTimeInterface $bookedUntil): self
    {
        $this->bookedUntil = $bookedUntil;

        return $this;
    }

    public function getApproved(): ?bool
    {
        return $this->approved;
    }

    public function setApproved(bool $approved): self
    {
        $this->approved = $approved;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getUsers(): ?User
    {
        return $this->users;
    }

    public function setUsers(?User $users): self
    {
        $this->users = $users;

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): self
    {
        $this->token = $token;

        return $this;
    }

    /**
     * @ORM\PrePersist()
     */
    public function setCreatedAtOnPersist(): void
    {
        $tokenGenerator = new TokenGenerator();
        $this->token = $tokenGenerator->getRandomSecureToken(30);
    }
}
