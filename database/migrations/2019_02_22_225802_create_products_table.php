<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {        
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('shortDescription', 255);
            $table->longText('longDescription');
            $table->mediumText('materials');
            $table->string('shortEnglishDescription', 255);
            $table->longText('longEnglishDescription');
            $table->mediumText('englishMaterials');
            $table->float('price')->unsigned();
            $table->float('discountPrice')->default(0)->nullable();                                    
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
