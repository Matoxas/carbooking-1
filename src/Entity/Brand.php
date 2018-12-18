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

    /**
     * Brand constructor.
     */
    public function __construct()
    {
        $this->cars = new ArrayCollection();
        $this->models = new ArrayCollection();
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
     * @return string|null
     */
    public function getBrand(): ?string
    {
        return $this->brand;
    }

    /**
     * @param string $brand
     * @return Brand
     */
    public function setBrand(string $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getModels(): Collection
    {
        return $this->models;
    }

    /**
     * @param Model $model
     * @return Brand
     */
    public function addModel(Model $model): self
    {
        if (!$this->models->contains($model)) {
            $this->models[] = $model;
            $model->setBrand($this);
        }

        return $this;
    }

    /**
     * @param Model $model
     * @return Brand
     */
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

    /**
     * @return Collection
     */
    public function getCars(): Collection
    {
        return $this->cars;
    }

    /**
     * @param Car $car
     * @return Brand
     */
    public function addCar(Car $car): self
    {
        if (!$this->cars->contains($car)) {
            $this->cars[] = $car;
            $car->setBrand($this);
        }

        return $this;
    }

    /**
     * @param Car $car
     * @return Brand
     */
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

    /**
     * @param Subscriber $subscribe
     * @return Brand
     */
    public function addSubscribe(Subscriber $subscribe): self
    {
        if (!$this->subscribes->contains($subscribe)) {
            $this->subscribes[] = $subscribe;
            $subscribe->setBrand($this);
        }

        return $this;
    }

    /**
     * @param Subscriber $subscribe
     * @return Brand
     */
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
