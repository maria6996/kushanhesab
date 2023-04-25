<?php

namespace App\Exceptions;


use Exception;

class CustomException extends Exception
{
          // ...

          /**
           * Get the exception's context information.
           *
           * @return array<string, mixed>
           */
          public function context(): array
          {
                    return ['user_id' => $this->user_id];
          }

}
