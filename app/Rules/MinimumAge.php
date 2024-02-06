<?php
namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Carbon\Carbon;

class MinimumAge implements Rule
{
    protected $minAge;

    public function __construct($minAge)
    {
        $this->minAge = $minAge;
    }

    public function passes($attribute, $value)
    {
        // Verifica que la fecha de nacimiento sea al menos $minAge años atrás
        return Carbon::parse($value)->addYears($this->minAge)->isBefore(Carbon::now());
    }

    public function message()
    {
        return 'El usuario debe tener al menos ' . $this->minAge . ' años.';
    }
}
?>