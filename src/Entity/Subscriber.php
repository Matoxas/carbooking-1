<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SubscriberRepository")
 */
class Subscriber
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
    public function getEmail(): ?string
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return Subscriber
     */
    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return City|null
     */
    public function getCity(): ?City
    {
        return $this->city;
    }

    /**
     * @param City|null $city
     * @return Subscriber
     */
    public function setCity(?City $city): self
    {
        $this->city = $city;

        return $this;
    }

    /**
     * @return \DateTimeInterface|null
     */
    public function getDateFrom(): ?\DateTimeInterface
    {
        return $this->dateFrom;
    }

    /**
     * @param \DateTimeInterface|null $dateFrom
     * @return Subscriber
     */
    public function setDateFrom(?\DateTimeInterface $dateFrom): self
    {
        $this->dateFrom = $dateFrom;

        return $this;
    }

    /**
     * @return \DateTimeInterface|null
     */
    public function getDateUntil(): ?\DateTimeInterface
    {
        return $this->dateUntil;
    }

    /**
     * @param \DateTimeInterface|null $dateUntil
     * @return Subscriber
     */
    public function setDateUntil(?\DateTimeInterface $dateUntil): self
    {
        $this->dateUntil = $dateUntil;

        return $this;
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
     * @return Subscriber
     */
    public function setBrand(?Brand $brand): self
    {
        $this->brand = $brand;

        return $this;
    }

    /**
     * @return Model|null
     */
    public function getModel(): ?Model
    {
        return $this->model;
    }

    /**
     * @param Model|null $model
     * @return Subscriber
     */
    public function setModel(?Model $model): self
    {
        $this->model = $model;

        return $this;
    }

    /**
     * @return float|null
     */
    public function getPriceFrom(): ?float
    {
        return $this->priceFrom;
    }

    /**
     * @param float|null $priceFrom
     * @return Subscriber
     */
    public function setPriceFrom(?float $priceFrom): self
    {
        $this->priceFrom = $priceFrom;

        return $this;
    }

    /**
     * @return float|null
     */
    public function getPriceUntil(): ?float
    {
        return $this->priceUntil;
    }

    /**
     * @param float|null $priceUntil
     * @return Subscriber
     */
    public function setPriceUntil(?float $priceUntil): self
    {
        $this->priceUntil = $priceUntil;

        return $this;
    }
}
