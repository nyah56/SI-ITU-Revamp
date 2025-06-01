<?php
namespace App\Models;

use App\OrderStatus;
use Illuminate\Database\Eloquent\Model;
use RedExplosion\Sqids\Concerns\HasSqids;

class Order extends Model
{
    //
    use HasSqids;
    protected $table      = 'order';
    protected $primaryKey = 'id';
    public $incrementing  = true;
    protected $fillable   = ['consumer_id', 'status'];
    public $timestamps    = true;
    protected $casts      = [
        'status' => OrderStatus::class,
    ];
    public function consumer()
    {
        return $this->belongsTo(Consumer::class, 'consumer_id');
    }

}
