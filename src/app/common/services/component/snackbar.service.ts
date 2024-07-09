import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    show(message: string, time: number) {
        let x = <HTMLDivElement> document.getElementById("snackbar");

        if(x !== null && x !== undefined) {
            x.innerText = "";
            x.innerText = message;
            x.classList.add("show");
            setTimeout(() => {
                x.classList.remove("show");
            }, time);
        }
      }
}
