<?php

namespace App\Serializer\Normalizer;

use App\Entity\Comment;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class CommentNormalizer implements NormalizerInterface
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
            'id'        => $object->getId(),
            'name'      => $object->getName(),
            'comment'   => $object->getComment(),
            'createdAt' => $object->getCreatedAt()->format('Y-m-d H:i:s')
        ];
    }

    /**
     * @param mixed $data
     * @param null $format
     * @return bool
     */
    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof Comment;
    }
}
