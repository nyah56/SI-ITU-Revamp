<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use RedExplosion\Sqids\Concerns\HasSqids;

class Order extends Model
{
    //
    use HasSqids;
    protected $table      = 'order';
    protected $primaryKey = 'id';
    public $incrementing  = true;
    protected $fillable   = ['consumer_id'];
    public $timestamps    = true;

    public function consumer()
    {
        return $this->belongsTo('consumer', 'consumer_id');
    }
}
