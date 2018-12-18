<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ModelRepository")
 */
class Model
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Brand", inversedBy="models")
     * @ORM\JoinColumn(nullable=false)
     */
    private $brand;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     */
    private $model;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Car", mappedBy="model")
     */
    private $cars;

    /**
     * @ORM\OneToMany(targetEntity="Subscriber", mappedBy="model")
     */
    private $subscribes;

    /**
     * Model constructor.
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
     * @return Brand|null
     */
    public function getBrand(): ?Brand
    {
        return $this->brand;
    }

    /**
     * @param Brand|null $brand
     * @return Model
     */
    public function setBrand(?Brand $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getModel(): ?string
    {
        return $this->model;
    }

    /**
     * @param $model
     */
    public function setModel($model): void
    {
        $this->model = $model;
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
     * @return Model
     */
    public function addCar(Car $car): self
    {
        if (!$this->cars->contains($car)) {
            $this->cars[] = $car;
            $car->setModel($this);
        }

        return $this;
    }

    /**
     * @param Car $car
     * @return Model
     */
    public function removeCar(Car $car): self
    {
        if ($this->cars->contains($car)) {
            $this->cars->removeElement($car);

            if ($car->getModel() === $this) {
                $car->setModel(null);
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
     * @return Model
     */
    public function addSubscribe(Subscriber $subscribe): self
    {
        if (!$this->subscribes->contains($subscribe)) {
            $this->subscribes[] = $subscribe;
            $subscribe->setModel($this);
        }

        return $this;
    }

    /**
     * @param Subscriber $subscribe
     * @return Model
     */
    public function removeSubscribe(Subscriber $subscribe): self
    {
        if ($this->subscribes->contains($subscribe)) {
            $this->subscribes->removeElement($subscribe);
            // set the owning side to null (unless already changed)
            if ($subscribe->getModel() === $this) {
                $subscribe->setModel(null);
            }
        }

        return $this;
    }
}
