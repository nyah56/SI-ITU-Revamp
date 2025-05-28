<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $table      = 'product';
    protected $primaryKey = 'id';
    public $incrementing  = true;
    protected $fillable   = ['product_name'];
    public $timestamps    = true;
}
