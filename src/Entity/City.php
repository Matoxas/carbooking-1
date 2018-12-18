<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CityRepository")
 */
class City
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Car", mappedBy="city")
     */
    private $cars;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     */
    private $city;

    /**
     * @ORM\OneToMany(targetEntity="Subscriber", mappedBy="city")
     */
    private $subscribes;

    /**
     * City constructor.
     */
    public function __construct()
    {
        $this->cars = new ArrayCollection();
        $this->subscribes = new ArrayCollection();
    }

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
    public function getCity()
    {
        return $this->city;
    }

    /**
     * @param $city
     */
    public function setCity($city): void
    {
        $this->city = $city;
    }

    /**
     * @return Collection
     */
    public function getCars(): Collection
    {
        return $this->cars;
    }

    /**
     * @param Car $car
     * @return City
     */
    public function addCar(Car $car): self
    {
        if (!$this->cars->contains($car)) {
            $this->cars[] = $car;
            $car->setCity($this);
        }

        return $this;
    }

    /**
     * @param Car $car
     * @return City
     */
    public function removeCar(Car $car): self
    {
        if ($this->cars->contains($car)) {
            $this->cars->removeElement($car);

            if ($car->getCity() === $this) {
                $car->setCity(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Subscriber[]
     */
    public function getSubscribes(): Collection
    {
        return $this->subscribes;
    }

    /**
     * @param Subscriber $subscribe
     * @return City
     */
    public function addSubscribe(Subscriber $subscribe): self
    {
        if (!$this->subscribes->contains($subscribe)) {
            $this->subscribes[] = $subscribe;
            $subscribe->setCity($this);
        }

        return $this;
    }

    /**
     * @param Subscriber $subscribe
     * @return City
     */
    public function removeSubscribe(Subscriber $subscribe): self
    {
        if ($this->subscribes->contains($subscribe)) {
            $this->subscribes->removeElement($subscribe);
            // set the owning side to null (unless already changed)
            if ($subscribe->getCity() === $this) {
                $subscribe->setCity(null);
            }
        }

        return $this;
    }
}
