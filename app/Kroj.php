<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kroj extends Model
{
    protected $fillable = ['name', 'has_collar', 'female'];
}
