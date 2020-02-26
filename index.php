<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
header("Access-Control-Allow-Methods: PUT, GET, POST");

// Populate field from fetch
$json = json_decode(file_get_contents('php://input'), true);

$searchVal = $json['searchVal'];
$param = $json['optionVal'];

// GET data from API
$curl = curl_init();

$request_url = "https://restcountries.eu/rest/v2/";

switch($param){
  case "fullName":
    $request_url .= "name/" . $searchVal . "?fullText=true";
  break;
  case "partialName":
    $request_url .= "name/" . $searchVal;
  break;
  case "alpha":
    $request_url .= "alpha/" . $searchVal;
  break;
}

curl_setopt_array($curl, array(
  CURLOPT_URL => $request_url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "cache-control: no-cache"
  ),
));

$apiResponse = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

$apiResponse = json_decode($apiResponse, true);

// Initializing response object to avoid JSON error
// https://stackoverflow.com/questions/8900701/creating-default-object-from-empty-value-in-php
$responsePHP = new \stdClass();

if($param == "partialName"){
  usort($apiResponse, 'sortDesc');
  $responsePHP->meta = tallyRegions($apiResponse);
} else{
  $responsePHP->meta = null;
}

$responsePHP->results = $apiResponse;
$response = json_encode($responsePHP);

// HashMap implementation
function tallyRegions($apiResponse){
  $region = array();
  $subRegion = array();

  foreach($apiResponse as $country){
    if(!array_key_exists($country['region'], $region)){
      $region[$country['region']] = 1;
    } else{
      $region[$country['region']] += 1;
    }

    if(!array_key_exists($country['subregion'], $subRegion)){
      $subRegion[$country['subregion']] = 1;
    } else {
      $subRegion[$country['subregion']] += 1;
    }
  }

  $tallyResult = array();
  $tallyResult['region'] = $region;
  $tallyResult['subRegion'] = $subRegion;
  $tallyResult['resultCount'] = count($apiResponse);
  // print_r($tallyResult);

  return $tallyResult;
  // print_r($region);
  // print_r($subRegion);
  // print_r(count($apiResponse));
}

function sortDesc($a , $b){
  if($a['population'] < $b['population']){
    return true;
  } else if($a['population'] > $b['population']){
    return false;
  } else{
    return 0;
  }
}

echo $response;
?>