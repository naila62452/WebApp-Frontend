import { ErrorHandler, Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class GlobalErrorHandler implements ErrorHandler {
    constructor(private _snackBar: MatSnackBar) { }
    handleError(error: any): void {
        this._snackBar.open("Server is down", "Ok", {
            duration: 5000,
            panelClass: ['blue-snackbar']
        });
        throw new Error("Method not implemented.");
    }

}