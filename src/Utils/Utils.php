<?php

namespace App\Utils;

class Utils
{
    public static function getData(string $filename): array
    {
        $data = [];
        $handler = fopen($filename, 'r');

        fgetcsv($handler); //skip first line

        while (($value = fgetcsv($handler, 1024, ';')) !== false) {
            array_push($data, $value);
        }

        return $data;
    }
}
