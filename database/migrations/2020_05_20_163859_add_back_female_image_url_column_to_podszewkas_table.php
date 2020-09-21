<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBackFemaleImageUrlColumnToPodszewkasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('podszewkas', function (Blueprint $table) {
            $table->string('back_female_image_url');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('podszewkas', function (Blueprint $table) {
            $table->dropColumn('back_female_image_url');
        });
    }
}
