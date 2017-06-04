import { Injectable } from '@angular/core';
import * as toastr from 'toastr'

@Injectable()
export class ToastrService {

    constructor () {
    }

    showInfo (message: string): void {
        toastr.info(message,'', {
            positionClass: 'toast-bottom-right'
        });
    }

    showSuccess (message: string): void {
        toastr.clear();
        toastr.success(message, '', {
            positionClass: 'toast-bottom-right'
        });
    }

    showError (message: string): void {
        toastr.error(message, '', { 
            closeButton: true,
            positionClass: 'toast-bottom-right'
        });
    }

    showWarning (message: string): void {
        toastr.warning(message, '', {
            positionClass: 'toast-bottom-right'
        });
    }
}