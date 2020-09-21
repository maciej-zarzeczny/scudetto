<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['status', 'user_id', 'name', 'address', 'post_code', 'additional_info', 'phone_number', 'email', 'custom_order', 'tkanina', 'podszewka', 'guziki', 'custom_size', 'tyl', 'kroj', 'custom_order_price', 'discount', 'shipping', 'female'];
    protected $guarded = ['user_id', 'name', 'address', 'post_code', 'additional_info', 'status', 'phone_number', 'email', 'custom_order', 'tkanina', 'podszewka', 'guziki', 'custom_size', 'tyl', 'kroj', 'cusrom_order_price', 'discount', 'shipping', 'female'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot(['quantity', 'size']);;
    }
}
