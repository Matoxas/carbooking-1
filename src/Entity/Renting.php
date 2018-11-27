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
     * @ORM\Column(type="datetime", nullable=false)
     * @Assert\NotBlank()
     * @Assert\DateTime()
     */
    private $rentedFrom;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     * @Assert\NotBlank()
     * @Assert\DateTime()
     */
    private $rentedUntil;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCar()
    {
        return $this->car;
    }

    public function setCar($car): void
    {
        $this->car = $car;
    }

    public function getRentedFrom()
    {
        return $this->rentedFrom;
    }

    public function setRentedFrom($rentedFrom): void
    {
        $this->rentedFrom = $rentedFrom;
    }

    public function getRentedUntil()
    {
        return $this->rentedUntil;
    }

    public function setRentedUntil($rentedUntil): void
    {
        $this->rentedUntil = $rentedUntil;
    }
}
