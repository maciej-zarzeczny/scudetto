<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Button extends Model
{
    protected $fillable = ['name', 'icon_url', 'female'];
}
