<?php
// REPLACE KEY WITH YOUR KEY
$address_unformatted = $_GET['a'];
$address = str_replace(" ", "+", $address_unformatted);

$url= "https://www.googleapis.com/civicinfo/v2/voterinfo?address={$address}&electionId=2000&key={KEY}";     
        
        // get product data
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

        echo(curl_exec($ch));
        curl_close($ch);
