<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\carRepository")
 */
class Image
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Car", inversedBy="images")
     * @ORM\JoinColumn(nullable=true)
     */
    private $car;

    /**
     * @ORM\Column(type="string", length=50, nullable=false)
     * @Assert\NotBlank()
     */
    private $image;

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
     * @return Image
     */
    public function setCar(?Car $car): self
    {
        $this->car = $car;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getImage()
    {
        return 'uploads/' . $this->image;
    }

    /**
     * @param mixed $image
     */
    public function setImage($image): void
    {
        $this->image = $image;
    }
}
