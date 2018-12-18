<?php

namespace App\Entity;

use App\Security\TokenGenerator;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CarRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Car
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="cars")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="float")
     * @Assert\NotBlank()
     */
    private $price;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Brand", inversedBy="cars")
     * @ORM\JoinColumn(nullable=false)
     */
    private $brand;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Model", inversedBy="cars")
     * @ORM\JoinColumn(nullable=false)
     */
    private $model;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\City", inversedBy="cars")
     * @ORM\JoinColumn(nullable=false)
     */
    private $city;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Renting", mappedBy="car")
     */
    private $renting;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Image", mappedBy="car")
     */
    private $images;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Booking", mappedBy="car")
     */
    private $bookings;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    private $address;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $latitude;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $longitude;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="car")
     */
    private $comments;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     */
    private $token;

    /**
     * @ORM\Column(type="boolean")
     */
    private $publish;

    /**
     * @ORM\Column(type="boolean")
     */
    private $confirmed;

    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     * @Assert\Length(min="10")
     */
    private $description;

    /**
     * Car constructor.
     */
    public function __construct()
    {
        $this->renting = new ArrayCollection();
        $this->images = new ArrayCollection();
        $this->bookings = new ArrayCollection();
        $this->comments = new ArrayCollection();
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
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param $user
     */
    public function setUser($user): void
    {
        $this->user = $user;
    }

    /**
     * @return mixed
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @param $price
     */
    public function setPrice($price): void
    {
        $this->price = $price;
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
     * @return Car
     */
    public function setBrand(?Brand $brand): self
    {
        $this->brand = $brand;

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
     * @return Car
     */
    public function setCity(?City $city): self
    {
        $this->city = $city;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param $createdAt
     */
    public function setCreatedAt($createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @return ArrayCollection
     */
    public function getRenting()
    {
        return $this->renting;
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
     * @return Car
     */
    public function setModel(?Model $model): self
    {
        $this->model = $model;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    /**
     * @param Image $image
     * @return Car
     */
    public function addImage(Image $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->setImage($this);
        }

        return $this;
    }

    /**
     * @param Image $image
     * @return Car
     */
    public function removeImage(Image $image): self
    {
        if ($this->images->contains($image)) {
            $this->images->removeElement($image);

            if ($image->getImage() === $this) {
                $image->setImage(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    /**
     * @param Booking $booking
     * @return Car
     */
    public function addBooking(Booking $booking): self
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings[] = $booking;
            $booking->setCar($this);
        }

        return $this;
    }

    /**
     * @param Booking $booking
     * @return Car
     */
    public function removeBooking(Booking $booking): self
    {
        if ($this->bookings->contains($booking)) {
            $this->bookings->removeElement($booking);

            if ($booking->getCar() === $this) {
                $booking->setCar(null);
            }
        }

        return $this;
    }

    /**
     * @return string|null
     */
    public function getAddress(): ?string
    {
        return $this->address;
    }

    /**
     * @param string|null $address
     * @return Car
     */
    public function setAddress(?string $address): self
    {
        $this->address = $address;

        return $this;
    }

    /**
     * @return float|null
     */
    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    /**
     * @param float|null $latitude
     * @return Car
     */
    public function setLatitude(?float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    /**
     * @return float|null
     */
    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    /**
     * @param float|null $longitude
     * @return Car
     */
    public function setLongitude(?float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    /**
     * @param Comment $comment
     * @return Car
     */
    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setCar($this);
        }

        return $this;
    }

    /**
     * @param Comment $comment
     * @return Car
     */
    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);

            if ($comment->getCar() === $this) {
                $comment->setCar(null);
            }
        }

        return $this;
    }

    /**
     * @return string|null
     */
    public function getToken(): ?string
    {
        return $this->token;
    }

    /**
     * @param string|null $token
     * @return Car
     */
    public function setToken(?string $token): self
    {
        $this->token = $token;

        return $this;
    }

    /**
     * @return bool|null
     */
    public function getPublish(): ?bool
    {
        return $this->publish;
    }

    /**
     * @param bool $publish
     * @return Car
     */
    public function setPublish(bool $publish): self
    {
        $this->publish = $publish;

        return $this;
    }

    /**
     * @return bool|null
     */
    public function getConfirmed(): ?bool
    {
        return $this->confirmed;
    }

    /**
     * @param bool $confirmed
     * @return Car
     */
    public function setConfirmed(bool $confirmed): self
    {
        $this->confirmed = $confirmed;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @param string $description
     * @return Car
     */
    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @ORM\PrePersist()
     */
    public function setCreatedAtOnPersist(): void
    {
        if ($this->createdAt === null) {
            $this->createdAt = new \DateTime();
        }

        $tokenGenerator = new TokenGenerator();
        $this->token = $tokenGenerator->getRandomSecureToken(30);
    }
}
