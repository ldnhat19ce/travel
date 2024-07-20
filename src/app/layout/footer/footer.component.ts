import { Component } from '@angular/core';
import { faFacebookF, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAngleRight, faArrowUp, faCopyright } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
})
export class FooterComponent {
    faTwitter = faTwitter;
    faFacebook = faFacebookF;
    faInstagram = faInstagram;
    faLinkedin = faLinkedin;
    faCopyright = faCopyright;
    faAngelRight = faAngleRight;
    faArrowUp = faArrowUp;
}
