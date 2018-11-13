<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BookingRepository")
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
     */
    private $bookedFrom;

    /**
     * @ORM\Column(type="datetime")
     */
    private $bookedUntil;

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
}
