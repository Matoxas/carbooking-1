<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RentDateRepository")
 */
class RentDate
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Car", inversedBy="rentDates")
     * @ORM\JoinColumn(nullable=true, name="car_id")
     */
    private $car;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     * @Assert\NotBlank()
     */
    private $rentedFrom;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     * @Assert\NotBlank()
     */
    private $rentedUntil;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getCar()
    {
        return $this->car;
    }

    /**
     * @param mixed $car
     */
    public function setCar($car): void
    {
        $this->car = $car;
    }

    /**
     * @return mixed
     */
    public function getRentedFrom()
    {
        return $this->rentedFrom;
    }

    /**
     * @param mixed $rentedFrom
     */
    public function setRentedFrom($rentedFrom): void
    {
        $this->rentedFrom = $rentedFrom;
    }

    /**
     * @return mixed
     */
    public function getRentedUntil()
    {
        return $this->rentedUntil;
    }

    /**
     * @param mixed $rentedUntil
     */
    public function setRentedUntil($rentedUntil): void
    {
        $this->rentedUntil = $rentedUntil;
    }
}
