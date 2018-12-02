<?php

namespace App\Serializer\Normalizer;

use App\Entity\Comment;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class CommentNormalizer implements NormalizerInterface
{
    public function normalize($object, $format = null, array $context = array())
    {
        return [
            'id'        => $object->getId(),
            'name'      => $object->getName(),
            'comment'   => $object->getComment(),
            'createdAt' => $object->getCreatedAt()->format('Y-m-d H:i:s')
        ];
    }

    public function supportsNormalization($data, $format = null)
    {
        return $data instanceof Comment;
    }
}
