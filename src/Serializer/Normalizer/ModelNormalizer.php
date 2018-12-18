<?php

namespace App\Serializer\Normalizer;

use App\Entity\Model;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ModelNormalizer implements NormalizerInterface
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
            'model' => $object->getModel()
        ];
    }

    /**
     * @param mixed $data
     * @param null $format
     * @return bool
     */
    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof Model;
    }
}
