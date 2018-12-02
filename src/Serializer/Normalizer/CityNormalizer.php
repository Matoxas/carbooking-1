<?php

namespace App\Serializer\Normalizer;

use App\Entity\City;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class CityNormalizer implements NormalizerInterface
{
    public function normalize($object, $format = null, array $context = array())
    {
        return [
            'id'    => $object->getId(),
            'city'  => $object->getCity()
        ];
    }

    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof City;
    }
}
