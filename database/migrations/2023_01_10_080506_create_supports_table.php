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
        Schema::create('supports', function (Blueprint $table) {
            $table->id();
            $table->enum('type',['تلفنی','حضوری','ریموت','پرسش-پاسخ']);
            $table->string('subject')->nullable();
            $table->text('description')->nullable();
            $table->string('phone')->nullable();
            $table->string('ip')->nullable();;
            $table->string('address')->nullable();
            $table->string('location')->nullable();
            $table->foreignId('user_id')->constrained('users');
            $table->integer('status');
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
        Schema::dropIfExists('supports');
    }
};
