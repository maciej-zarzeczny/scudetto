<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;
use function GuzzleHttp\json_decode;
use App\Product;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderSubmitted;
use App\Mail\CustomOrder;
use App\Mail\OrderPacked;
use App\Mail\OrderSent;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $products = json_decode($request->products);        

        if (auth()->user() != null)
        {   
            $user_id = auth()->user()->id; 
        }
        else 
        {
            $user_id = 0;
        }

        $custom_order = false;
        $tkaniny = '';
        $podszewki = '';
        $guziki = '';        
        $sizes = '';
        $kroje = '';
        $tyly = '';
        $females = '';
        $custom_order_price = 0;

        foreach ($products as $product)  {
            if (isset($product->customProduct))
            {
                $custom_order = true;
                $tkaniny .= $product->tkanina . " ";
                $podszewki .= $product->podszewka . " ";
                $guziki .= $product->guziki . " ";  
                $tyly .= $product->tyl . " ";
                $kroje .= $product->kroj . " ";
                $sizes .= $product->size . " ";     
                $females .= $product->female . " ";      
                $custom_order_price += $product->price;   
            }
        }

        $order = Order::create([
            'status' => $request->status,
            'user_id' => $user_id,
            'email' => $request->email,
            'phone_number' => $request->phoneNumber,
            'name' => $request->name,
            'address' => $request->address,
            'post_code' => $request->postCode,
            'additional_info' => $request->additionalInfo,
            'custom_order' => $custom_order,
            'custom_order_price' => $custom_order_price,
            'tkanina' => $tkaniny,
            'podszewka' => $podszewki,
            'guziki' => $guziki,
            'tyl' => $tyly,
            'kroj' => $kroje,
            'female' => $females,
            'custom_size' => $sizes,
            'discount' => $request->discount,
            'shipping' => $request->shipping
         ]);        

        $order->save();
        $amount = 0;       

        foreach ($products as $product) 
        {
            if (!isset($product->customProduct))
            {                
                $order->products()->attach(Product::find($product->id), ['quantity' => $product->amount, 'size' => $product->size]);
                if ($product->type != 'voucher') {
                    if ($product->discountPrice < $product->price && $product->discountPrice != 0) {
                        $amount += $product->discountPrice * $product->amount;                    
                    } else {
                        $amount += $product->price * $product->amount;
                    }                
                } else {
                    $size = $product->size;
                    if ($size == 'Dla par') {
                        $amount += 550 * $product->amount;
                    } else if ($size == 'Tata i Syn') {
                        $amount += 500 * $product->amount;
                    } else if($size == 'Mama i Syn') {
                        $amount += 450 * $product->amount;
                    } else if ($size == 'Kamizelka męska') {
                        $amount += 380 * $product->amount;
                    } else if ($size == 'Kamizelka damska') {
                        $amount += 290 * $product->amount;
                    }
                }
            }
            else 
            {
                $amount += $product->price;                
            }                    
        }       
        
        if ($order->discount != null && $order->discount != 0) {
            $amount *= (1 - ($order->discount / 100));
        }

        if ($order->shipping == '1' && $order->discount < 100) {
            $amount += 15;
        } else if($order->shipping == '2' && $order->dicount < 100) {
            $amount += 50;
        }

        try {
            Mail::to($order->email)->send(new OrderSubmitted($order, $amount));
            return $order->id;
        } 
        catch(\Exception $e) {            
            return $order->id;
        }        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        if ($order->status != $request->status)
        {            
            $order->status = $request->status;
            
            if ($request->status == "W trakcie pakowania")
            {                
                Mail::to($order->email)->send(new OrderPacked($order));
            }
            else if ($request->status == "Zamówienie wysłane") 
            {
                Mail::to($order->email)->send(new OrderSent($order));
            }
            $order->save();   
        }        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
