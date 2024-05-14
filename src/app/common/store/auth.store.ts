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
            patchState(store, { isAdmin: isAdmin });
        },
    }))
);
