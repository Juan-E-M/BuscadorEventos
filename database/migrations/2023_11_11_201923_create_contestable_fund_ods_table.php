<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contestable_fund_ods', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('contestable_fund_id');
            $table->foreign('contestable_fund_id')
                ->references('id')
                ->on('contestable_funds')
                ->onDelete('cascade');
            $table->unsignedBigInteger('ods_id')->nullable();
                $table->foreign('ods_id')
                    ->references('id')
                    ->on('odss')
                    ->onDelete('set null');
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
        Schema::dropIfExists('contestable_fund_ods');
    }
};
