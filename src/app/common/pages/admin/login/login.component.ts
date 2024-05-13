import { Component, inject, signal, WritableSignal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormsModule } from '@angular/forms';
import { Error } from '../../../model/error.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [TranslateModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    private _authenticationService = inject(AuthenticationService);
    private _translateService = inject(TranslateService);

    email: WritableSignal<string> = signal<string>('');
    password: WritableSignal<string> = signal<string>('');

    errorEmail: WritableSignal<string> = signal<string>('');
    errorPassword: WritableSignal<string> = signal<string>('');

    resultError: Error = {} as Error;

    login() {
        let isValid = true;

        if (this.email().trim().length <= 0) {
            isValid = false;
            this.errorEmail.set(this._translateService.instant('msg.login.001'));
        }

        if (this.password().trim().length <= 0) {
            isValid = false;
            this.errorPassword.set(this._translateService.instant('msg.login.002'));
        }

        if (isValid) {
            this._authenticationService
                .adminAuthentication({ email: this.email().trim(), password: this.password().trim() })
                .subscribe({
                    next: () => {
                        console.log("login success")
                    },
                    error: (err: HttpErrorResponse) => {
                        this.resultError = err.error;
                    }
                });
        }
    }
}
