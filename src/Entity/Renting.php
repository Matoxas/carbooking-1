<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RentingRepository")
 */
class Renting
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Car", inversedBy="renting")
     * @ORM\JoinColumn(nullable=true, name="car_id")
     */
    private $car;

    /**
     * @ORM\Column(type="datetime")
     */
    private $rentedFrom;

    /**
     * @ORM\Column(type="datetime")
     */
    private $rentedUntil;

    /**
     * @return int|null
     */
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
     * @param $car
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
     * @param $rentedFrom
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
     * @param $rentedUntil
     */
    public function setRentedUntil($rentedUntil): void
    {
        $this->rentedUntil = $rentedUntil;
    }
}
