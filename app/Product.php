<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'shortDescription',
        'shortEnglishDescription',
        'longDescription',
        'longEnglishDescription',
        'materials',
        'englishMaterials',
        'price',
        'discountPrice',        
        'choosedSize',
        'choosedAmount',
        'type'
    ];

    protected $hidden = [        
        'choosedSize',
        'choosedAmount'
    ];

    public function sizes()
    {
        return $this->belongsToMany(Size::class)->withPivot('quantity');
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_product', 'order_id', 'product_id');
    }
}
