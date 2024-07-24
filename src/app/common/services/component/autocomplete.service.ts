import { Injectable } from '@angular/core';
import { Product } from '../../model/product.model';

@Injectable({
    providedIn: 'root',
})
export class AutocompleteService {
    currentFocus: number = 0;

    autocompleteProduct(input: HTMLElement, array: Product) {
        input.addEventListener("input", () => {

        })
    }

    removeActive(x: HTMLElement[]): void {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    closeAllLists(elmnt: HTMLElement, inp: HTMLElement): void {
        const x: HTMLCollectionOf<Element> = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt !== x[i] && elmnt !== inp) {
                x[i].parentNode?.removeChild(x[i]);
            }
        }
    }
}
