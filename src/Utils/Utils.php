<?php

namespace App\Utils;

class Utils
{
    /**
     * @param string $address
     * @return array
     */
    public static function fetchLocationByAddress(string $address): array
    {
        $key = getenv('MAP_API_KEY');

        $queryUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($address) . '&key=' . $key;

        $dataJson = file_get_contents($queryUrl);
        $data = json_decode($dataJson, true);

        if (isset($data)) {
            return self::parseLocation($data);
        }

        return [];
    }

    /**
     * @param array $data
     * @return array
     */
    private static function parseLocation(array $data): array
    {
        $lat = $lng = null;
        $results = $data['results'];

        if (isset($results[0])) {
            $results = $results[0];
            $location = $results['geometry']['location'];
            $lat = $location['lat'];
            $lng = $location['lng'];
        }

        return ['lat' => $lat, 'lng' => $lng];
    }

    /**
     * @param string $filename
     * @return array
     */
    public static function getData(string $filename): array
    {
        $data = [];
        $handler = fopen($filename, 'r');

        fgetcsv($handler); //skip first line

        while (($value = fgetcsv($handler, 5000, ';'))) {
            array_push($data, $value);
        }

        return $data;
    }
}
