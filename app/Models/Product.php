<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use RedExplosion\Sqids\Concerns\HasSqids;

class Product extends Model
{
    use HasSqids;
    //
    protected $table      = 'product';
    protected $primaryKey = 'id';
    public $incrementing  = true;
    protected $fillable   = ['product_name'];
    public $timestamps    = true;
}
