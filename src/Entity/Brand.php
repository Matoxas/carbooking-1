<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BrandRepository")
 */
class Brand
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $brand;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Model", mappedBy="brand")
     */
    private $models;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Car", mappedBy="brand")
     */
    private $cars;

    /**
     * @ORM\OneToMany(targetEntity="Subscriber", mappedBy="brand")
     */
    private $subscribes;

    public function __construct()
    {
        $this->cars = new ArrayCollection();
        $this->models = new ArrayCollection();
        $this->subscribes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function getModels(): Collection
    {
        return $this->models;
    }

    public function addModel(Model $model): self
    {
        if (!$this->models->contains($model)) {
            $this->models[] = $model;
            $model->setBrand($this);
        }

        return $this;
    }

    public function removeModel(Model $model): self
    {
        if ($this->models->contains($model)) {
            $this->models->removeElement($model);

            if ($model->getBrand() === $this) {
                $model->setBrand(null);
            }
        }

        return $this;
    }

    public function getCars(): Collection
    {
        return $this->cars;
    }

    public function addCar(Car $car): self
    {
        if (!$this->cars->contains($car)) {
            $this->cars[] = $car;
            $car->setBrand($this);
        }

        return $this;
    }

    public function removeCar(Car $car): self
    {
        if ($this->cars->contains($car)) {
            $this->cars->removeElement($car);

            if ($car->getBrand() === $this) {
                $car->setBrand(null);
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

    public function addSubscribe(Subscriber $subscribe): self
    {
        if (!$this->subscribes->contains($subscribe)) {
            $this->subscribes[] = $subscribe;
            $subscribe->setBrand($this);
        }

        return $this;
    }

    public function removeSubscribe(Subscriber $subscribe): self
    {
        if ($this->subscribes->contains($subscribe)) {
            $this->subscribes->removeElement($subscribe);
            // set the owning side to null (unless already changed)
            if ($subscribe->getBrand() === $this) {
                $subscribe->setBrand(null);
            }
        }

        return $this;
    }
}
