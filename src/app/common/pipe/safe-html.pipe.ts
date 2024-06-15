import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeHTML',
    standalone: true,
})
export class SafeHTMLPipe implements PipeTransform {
    private sanitizer: DomSanitizer = inject(DomSanitizer);

    transform(unsafe: string): unknown {
        return this.sanitizer.bypassSecurityTrustHtml(unsafe);
    }
}
