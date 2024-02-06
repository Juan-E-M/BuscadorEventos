<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $fillable = [
        'institution',
        'name',
        'summary',
        'start_date',
        'end_date',
        'status',
        'budget',
        'link',
        'others',
        'region',
        'publication',
        'file_path',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
    public function trl()
    {
        return $this->belongsTo(Trl::class);
    }
    public function crl()
    {
        return $this->belongsTo(Crl::class);
    }
    public function ocde()
    {
        return $this->belongsToMany(Ocde::class, 'event_ocde', 'event_id', 'ocde_id');
    }
    public function ods()
    {
        return $this->belongsToMany(Ods::class, 'event_ods', 'event_id', 'ods_id');
    }
}
