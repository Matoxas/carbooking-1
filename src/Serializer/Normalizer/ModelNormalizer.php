<?php

namespace App\Serializer\Normalizer;

use App\Entity\Model;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ModelNormalizer implements NormalizerInterface
{
    public function normalize($object, $format = null, array $context = array())
    {
        return [
            'id'    => $object->getId(),
            'model'  => $object->getModel()
        ];
    }

    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof Model;
    }

}