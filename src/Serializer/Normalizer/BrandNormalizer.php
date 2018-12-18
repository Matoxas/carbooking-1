<?php

namespace App\Serializer\Normalizer;

use App\Entity\Brand;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class BrandNormalizer implements NormalizerInterface
{
    /**
     * @param mixed $object
     * @param null $format
     * @param array $context
     * @return array|bool|float|int|string
     */
    public function normalize($object, $format = null, array $context = array())
    {
        return [
            'id'    => $object->getId(),
            'brand' => $object->getBrand()
        ];
    }

    /**
     * @param mixed $data
     * @param null $format
     * @return bool
     */
    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof Brand;
    }
}
