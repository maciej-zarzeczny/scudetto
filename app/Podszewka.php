<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Podszewka extends Model
{
    protected $fillable = ['name', 'quantity', 'image_url', 'icon_url', 'back_image_url', 'back_female_image_url'];
}
