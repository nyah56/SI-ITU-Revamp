<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use RedExplosion\Sqids\Concerns\HasSqids;

class Farmer extends Model
{
    //
    use HasSqids;
    protected $table      = 'farmer';
    protected $primaryKey = 'id';
    public $incrementing  = true;
    protected $fillable   = ['farmer_name', 'phone', 'email', 'address'];
    public $timestamps    = true;
}
