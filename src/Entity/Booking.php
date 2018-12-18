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

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Car|null
     */
    public function getCar(): ?Car
    {
        return $this->car;
    }

    /**
     * @param Car|null $car
     * @return Booking
     */
    public function setCar(?Car $car): self
    {
        $this->car = $car;

        return $this;
    }

    /**
     * @return \DateTimeInterface|null
     */
    public function getBookedFrom(): ?\DateTimeInterface
    {
        return $this->bookedFrom;
    }

    /**
     * @param \DateTimeInterface $bookedFrom
     * @return Booking
     */
    public function setBookedFrom(\DateTimeInterface $bookedFrom): self
    {
        $this->bookedFrom = $bookedFrom;

        return $this;
    }

    /**
     * @return \DateTimeInterface|null
     */
    public function getBookedUntil(): ?\DateTimeInterface
    {
        return $this->bookedUntil;
    }

    /**
     * @param \DateTimeInterface $bookedUntil
     * @return Booking
     */
    public function setBookedUntil(\DateTimeInterface $bookedUntil): self
    {
        $this->bookedUntil = $bookedUntil;

        return $this;
    }

    /**
     * @return bool|null
     */
    public function getApproved(): ?bool
    {
        return $this->approved;
    }

    /**
     * @param bool $approved
     * @return Booking
     */
    public function setApproved(bool $approved): self
    {
        $this->approved = $approved;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getMessage(): ?string
    {
        return $this->message;
    }

    /**
     * @param string|null $message
     * @return Booking
     */
    public function setMessage(?string $message): self
    {
        $this->message = $message;

        return $this;
    }

    /**
     * @return User|null
     */
    public function getUsers(): ?User
    {
        return $this->users;
    }

    /**
     * @param User|null $users
     * @return Booking
     */
    public function setUsers(?User $users): self
    {
        $this->users = $users;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getToken(): ?string
    {
        return $this->token;
    }

    /**
     * @param string $token
     * @return Booking
     */
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
