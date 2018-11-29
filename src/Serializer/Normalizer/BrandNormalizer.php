<?php

namespace App\Serializer\Normalizer;

use App\Entity\Brand;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class BrandNormalizer implements NormalizerInterface
{
    public function normalize($object, $format = null, array $context = array())
    {
        return [
            'id'    => $object->getId(),
            'brand'  => $object->getBrand()
        ];
    }

    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof Brand;
    }

}