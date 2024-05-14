import { signal } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type AuthState = {
    isAdmin: boolean;
};

const initialState: AuthState = {
    isAdmin: false
};

export const AuthStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        updateIsAdmin(isAdmin: boolean): void {
            console.log("patch state: " + isAdmin)
            patchState(store, { isAdmin: isAdmin });
        },
    }))
);

export const isAdmin = signal(false);
