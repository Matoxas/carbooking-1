<?php

namespace App\Serializer\Normalizer;

use App\Entity\City;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class CityNormalizer implements NormalizerInterface
{
    /**
     * @param $object
     * @param null $format
     * @param array $context
     * @return array|bool|float|int|string
     */
    public function normalize($object, $format = null, array $context = array())
    {
        return [
            'id'    => $object->getId(),
            'city'  => $object->getCity()
        ];
    }

    /**
     * @param mixed $data
     * @param null $format
     * @return bool
     */
    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof City;
    }
}
