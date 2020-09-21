<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {        
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email');
            $table->string('phone_number');
            $table->string('address');
            $table->string('post_code');
            $table->text('additional_info')->nullable();                     
            $table->string('status');            
            $table->unsignedInteger('user_id')->nullable();
            $table->boolean('custom_order')->default(false);
            $table->integer('custom_order_price')->default(0)->nullable();
            $table->string('tkanina')->nullable();
            $table->string('podszewka')->nullable();
            $table->string('guziki')->nullable();
            $table->string('custom_size')->nullable();
            $table->string('kroj')->nullable();
            $table->string('tyl')->nullable();            
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
        Schema::dropIfExists('orders');
    }
}
