<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use RedExplosion\Sqids\Concerns\HasSqids;

class Consumer extends Model
{
    //
    use HasSqids;
    protected $table      = 'consumer';
    protected $primaryKey = 'id';
    public $incrementing  = true;
    protected $fillable   = ['consumer_name', 'phone', 'email', 'address'];
    public $timestamps    = true;
}
