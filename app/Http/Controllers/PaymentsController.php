<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentsController extends Controller
{
    public function registerTransaction(Request $request) {        
        $p24_secret = env('PRZELEWY24_SECRET', '');        
        $p24_merchant_id = intval(env('PRZELEWY24_MERCHANT_ID', 11111));
        $p24_pos_id = intval(env('PRZELEWY24_POS_ID', 11111));
        $p24_crc = env('PRZELEWY24_CRC', '');                
        $p24_sandbox = env('PRZELEWY24_TEST_SERVER', true);
        $p24_url_return = env('PRZELEWY24_URL_RETURN', '');
        $p24_url_status = env('PRZELEWY24_URL_STATUS', '');        
        
        $check_sum = json_encode(array(
            "sessionId" => strval($request->sessionId),
            "merchantId" => intval($p24_merchant_id),
            "amount" => intval($request->amount) * 100,
            "currency" => "PLN",
            "crc" => $p24_crc,
        ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);        
        
        $p24_sign = hash('sha384', $check_sum);

        $basic_auth = base64_encode($p24_merchant_id . ":" . $p24_secret);        

        $p24_url = '';

        if ($p24_sandbox) {
            $p24_url = 'https://secure.przelewy24.pl/api/v1/transaction/register';
        } else {
            $p24_url = 'https://secure.przelewy24.pl/api/v1/transaction/register';
        }             

        $post_fields = json_encode(array(
            "merchantId" => $p24_merchant_id,
            "posId" => $p24_pos_id,
            "sessionId"=> strval($request->sessionId),
            "amount"=> intval($request->amount) * 100,
            "currency"=> "PLN",
            "description"=> "Payment for product",
            "email"=> strval($request->email),
            "country"=> "PL",
            "language"=> "pl",
            "urlReturn"=> strval($p24_url_return),
            "urlStatus"=> strval($p24_url_status),
            "sign"=> $p24_sign,
        ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);        

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $p24_url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,            
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $post_fields,
            CURLOPT_HTTPHEADER => array(           
                "Authorization: Basic " . $basic_auth,     
                "Content-Type: application/json",                
                "cache-control: no-cache"
                ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);


        if ($err) {
          echo "cURL Error #:" . $err;
        } else {
          echo $response;
        }
    }

    public function verifyTransaction($session_id, $order_id, $amount) {
        
        $p24_secret = env('PRZELEWY24_SECRET', '');
        $p24_merchant_id = intval(env('PRZELEWY24_MERCHANT_ID', 11111));
        $p24_pos_id = intval(env('PRZELEWY24_POS_ID', 11111));
        $p24_crc = env('PRZELEWY24_CRC', '');                
        $p24_sandbox = env('PRZELEWY24_TEST_SERVER', true);        
        
        $check_sum = json_encode(array(
            "sessionId" => strval($session_id),
            "orderId" => intval($order_id),
            "amount" => intval($amount),
            "currency" => "PLN",
            "crc" => strval($p24_crc),
        ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);      

        $p24_sign = hash('sha384', $check_sum);
        $basic_auth = base64_encode($p24_merchant_id . ":" . $p24_secret);        
        $p24_url = '';

        if ($p24_sandbox) {
            $p24_url = 'https://secure.przelewy24.pl/api/v1/transaction/verify';
        } else {
            $p24_url = 'https://secure.przelewy24.pl/api/v1/transaction/verify';
        }        

        $post_fields = json_encode(array(
            "merchantId"=>$p24_merchant_id,
            "posId"=>$p24_pos_id,
            "sessionId"=>strval($session_id),
            "amount"=>intval($amount),
            "currency"=>"PLN",
            "orderId"=>intval($order_id),
            "sign"=>strval($p24_sign)
        ), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $p24_url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "PUT",
            CURLOPT_POSTFIELDS => $post_fields,
            CURLOPT_HTTPHEADER => array(
              "Authorization: Basic " . $basic_auth,
              "Content-Type: application/json",              
              "cache-control: no-cache"
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        if ($err) {
            return false;
        } else {                
            return true;
        }
        
    }
    
    public function checkStatus() {
        $p24_secret = env('PRZELEWY24_SECRET', '');
        $p24_merchant_id = intval(env('PRZELEWY24_MERCHANT_ID', 11111));

        $basic_auth = base64_encode($p24_merchant_id . ":" . $p24_secret);

        $session_id = '';
        $order_id = '';

        if(isset($_COOKIE['sessionId'])) {
            $session_id = $_COOKIE['sessionId'];
        }        

        if(isset($_COOKIE['orderId'])) {
            $order_id = $_COOKIE['orderId'];
        }        

        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => "https://secure.przelewy24.pl/api/v1/transaction/by/sessionId/" . $session_id,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 30,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
            "Authorization: Basic " . $basic_auth,
            "Content-Type: application/json",    
            "cache-control: no-cache"
            ),
          ));
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        
        curl_close($curl);
        
        if ($err) {
          echo "cURL Error #:" . $err;
        } else {                        
            $res = json_decode($response)->data;     
            $error = false;                   
            
            if ($res->status == 1) {                                
                if ($this->verifyTransaction($session_id, $res->orderId, $res->amount)) {
                    $error = false;
                    return view('confirmation', compact('order_id', 'error'));    
                } else {
                    $error = true;
                    return view('confirmation', compact('order_id', 'error'));    
                }
            } else {
                $error = true;
                return view('confirmation', compact('order_id', 'error'));
            }
        }
    }
}
