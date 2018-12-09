<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SubscribeRepository")
 */
class Subscribe
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=55)
     * @Assert\Email()
     */
    private $email;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\City", inversedBy="subscribes")
     */
    private $city;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateFrom;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateUntil;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Brand", inversedBy="subscribes")
     */
    private $brand;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Model", inversedBy="subscribes")
     */
    private $model;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $priceFrom;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $priceUntil;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCity(): ?City
    {
        return $this->city;
    }

    public function setCity(?City $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getDateFrom(): ?\DateTimeInterface
    {
        return $this->dateFrom;
    }

    public function setDateFrom(?\DateTimeInterface $dateFrom): self
    {
        $this->dateFrom = $dateFrom;

        return $this;
    }

    public function getDateUntil(): ?\DateTimeInterface
    {
        return $this->dateUntil;
    }

    public function setDateUntil(?\DateTimeInterface $dateUntil): self
    {
        $this->dateUntil = $dateUntil;

        return $this;
    }

    public function getBrand(): ?Brand
    {
        return $this->brand;
    }

    public function setBrand(?Brand $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    public function getModel(): ?Model
    {
        return $this->model;
    }

    public function setModel(?Model $model): self
    {
        $this->model = $model;

        return $this;
    }

    public function getPriceFrom(): ?float
    {
        return $this->priceFrom;
    }

    public function setPriceFrom(?float $priceFrom): self
    {
        $this->priceFrom = $priceFrom;

        return $this;
    }

    public function getPriceUntil(): ?float
    {
        return $this->priceUntil;
    }

    public function setPriceUntil(?float $priceUntil): self
    {
        $this->priceUntil = $priceUntil;

        return $this;
    }
}
