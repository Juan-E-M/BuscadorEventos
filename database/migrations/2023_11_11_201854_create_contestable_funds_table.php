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
        Schema::create('contestable_funds', function (Blueprint $table) {
            $table->id();
            $table->string('institution', 200);
            $table->string('name', 200);
            $table->text('summary');
            $table->date('start_date');
            $table->date('end_date');
            $table->boolean('status');
            $table->double('budget');
            $table->text('link');
            $table->text('others');
            $table->string('region', 100);
            $table->string('file_path')->nullable();
            //foreign keys
            $table->unsignedBigInteger('country_id')->nullable();
            $table->foreign('country_id')
                ->references('id')
                ->on('countrys')
                ->onDelete('set null');
            $table->unsignedBigInteger('trl_id')->nullable();
            $table->foreign('trl_id')
                ->references('id')
                ->on('trl')
                ->onDelete('set null');
            $table->unsignedBigInteger('crl_id')->nullable();
            $table->foreign('crl_id')
                ->references('id')
                ->on('crl')
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
        Schema::dropIfExists('contestable_funds');
    }
};
