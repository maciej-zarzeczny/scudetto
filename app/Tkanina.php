<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tkanina extends Model
{
    protected $fillable = ['name', 'quantity', 'icon_url', 'back_image_url', 'single_addon_url', 'addon_with_collar_url', 'female'];    
}
