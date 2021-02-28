<?php

use Illuminate\Support\Facades\Session;

Route::get('/', function() {
  return view('home');
});

Route::resource('products', 'ProductController');
Route::resource('orders', 'OrderController');
Route::post('products/updateSize/{id}', 'ProductController@updateSize');

Route::get('/cart', function() {
  return view('cart');
});

Route::get('/checkout', function() {
  return view('checkout');
});

Route::get('/configurator/{gender}', function($gender) {
  return view('configurator', ['gender' => $gender]);
});

Route::get('/choose', function() {
  return view('choose_configurator');
});

Route::get('terms', function() {
  return view('terms');
});

Route::get('company-info', function() {
  return view('company_info');
});

Route::get('/configurator/sizes/{gender}', function($gender) {  
  if ($gender == 'male') {
    return \App\Size::where('sizeName', '>=', 44)->where('sizeName', '<=', 58)->orderBy('sizeName')->get();
  } else {
    return \App\Size::where('sizeName', '<=', 44)->where('sizeName', '>=', 34)->orderBy('sizeName')->get();
  }  
});
Route::get('/configurator/tkanina/{gender}', function($gender) {
  if ($gender == 'male') {
    return \App\Tkanina::where('female', 0)->get();
  } else {
    return \App\Tkanina::where('female', 1)->get();
  }
});
Route::get('/configurator/podszewka/get', function() {
  return \App\Podszewka::all();
});
Route::get('/configurator/button/{gender}', function($gender) {
  if ($gender == 'male') {
    return \App\Button::where('female', 0)->get();
  } else {
    return \App\Button::where('female', 1)->get();
  }
});
Route::get('/configurator/kroj/{gender}', function($gender) {  
  if ($gender == 'male') {
    return \App\Kroj::where('female', 0)->get();
  } else {
    return \App\Kroj::where('female', 1)->get();
  }  
});

Route::get('/payment/{id}', function($id) {      
  $order = \App\Order::find($id);
  $number = $order->id;
  $amount = 0;  
  $email = $order->email;
  
  $products = $order->products;    
  foreach($products as $product) {    
    if ($product->type != 'voucher') {
      if ($product->discountPrice < $product->price && $product->discountPrice != 0) {
        $amount += $product->discountPrice * $product->pivot->quantity;
      } else {
        $amount += $product->price * $product->pivot->quantity;
      }
    } else {
      $size = $product->pivot->size;
      if ($size == 'Dla par') {
        $amount += 550 * $product->pivot->quantity;
      } else if ($size == 'Tata i Syn') {
        $amount += 500 * $product->pivot->quantity;
      } else if($size == 'Mama i Syn') {
        $amount += 450 * $product->pivot->quantity;
      } else if ($size == 'Kamizelka męska') {
        $amount += 380 * $product->pivot->quantity;
      } else if ($size == 'Kamizelka damska') {
        $amount += 290 * $product->pivot->quantity;
      }
    }    
  }
  if ($order->custom_order) {
    $amount += $order->custom_order_price;
  }

  $isVoucher = false;
  if ($order->discount == 100) {
    $isVoucher = true;
  }

  $discountAmount = 0;
  if ($order->discount != null && $order->discount != 0) {
    $discountAmount = $amount * (1 - ($order->discount / 100));
  }

  if ($order->shipping == '1') {
    $amount += 15;
    if ($discountAmount > 0) {
      $discountAmount += 15;
    }    
  } else if ($order->shipping == '2') {
    $amount += 50;
    if ($discountAmount > 0) {
      $discountAmount += 50;
    }    
  }

  return view('payment', compact('number', 'amount', 'discountAmount', 'email', 'isVoucher'));
});

Route::resource('coupons', 'CouponController');
Route::post('/coupons/check', 'CouponController@checkCoupon');

Route::get('/confirmation/{order_id}', function($order_id) {  
  $error = false;
  return view('confirmation', compact('order_id', 'error'));
});

Route::get('orders', function() {  
  $orders = auth()->user()->orders;
  foreach($orders as $order) {
    $order->products;
  }
  return view('orders', compact('orders'));
})->middleware('auth');

Route::get('admin/stats', function() {
  $products = \App\Product::get();
  $orders = \App\Order::get();
  $users = \App\User::get();

  $result_arr = [
    'products' => count($products),
    'orders' => count($orders),
    'users' => count($users)
  ];

  return $result_arr;
})->middleware('admin');

Route::get('admin/users', function() {
  $users = \App\User::all();
  foreach($users as $user) {
    $user->orders;
  }
  return $users;
})->middleware('admin');

Route::get('admin', function() {
  return view('admin_page');
})->middleware('admin');

Route::get('admin/products/get', function() {
  $products = \App\Product::all();
  foreach($products as $product) {
    $product->sizes;
  }  
  return $products;
})->middleware('admin');

Route::get('admin/orders/get', function() {  
  $orders = \App\Order::orderBy('id', 'desc')->get();
  foreach($orders as $order) {
    $order->products;
  }
  return $orders;
})->middleware('admin');

Route::get('admin/sizes/get', function() {
  return \App\Size::orderBy('sizeName')->get();
})->middleware('admin');

Route::get('admin/sizes/{id}', function($id) {
  return \App\Product::find($id)->sizes;
})->middleware('admin');

Route::resource('gallery', 'GalleryImageController');
Route::post('gallery/delete/{id}', 'GalleryImageController@destroy');
Route::get('gallery-get/first', function() {
  return \App\GalleryImage::take(8)->get();
});
Route::get('gallery-get/second', function() {
  $galleryImagesCount = \App\GalleryImage::all()->count();
  return \App\GalleryImage::skip(8)->take($galleryImagesCount)->get();
});

// PAYMENT ROUTES
Route::post('/payments/register', 'PaymentsController@registerTransaction');
Route::post('/payments/verify', 'PaymentsController@verifyTransaction');
Route::get('/payments/status', 'PaymentsController@checkStatus');

// CONFIGURATOR ROUTES
Route::resource('tkanina', 'TkaninaController');
Route::resource('podszewka', 'PodszewkaController');
Route::resource('button', 'ButtonController');
Route::resource('kroj', 'KrojController');
Route::post('kroj/delete/{id}', 'KrojController@destroy');
Route::post('tkanina/image/{which}', 'TkaninaController@addImage');
Route::post('tkanina/delete/{id}', 'TkaninaController@destroy');
Route::post('podszewka/image/{which}', 'PodszewkaController@addImage');
Route::post('button/image/{which}', 'ButtonController@addImage');

// LANGUAGE CHANGE
Route::get('setLocale/{locale}', function ($locale) {
  if (in_array($locale, \Config::get('app.locales'))) {
    Session::put('locale', $locale);
  }
  return redirect()->back();
});

Route::get('language', function() {
  return Session::get('locale', 'pl');
});

Route::get('/admin/clear-cache', function() {
  Artisan::call('cache:clear');
  return "Cache is cleared";
});

Auth::routes();