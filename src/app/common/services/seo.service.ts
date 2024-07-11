import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class SeoService {
    constructor(private meta: Meta,
                private titleService: Title,
                @Inject(PLATFORM_ID) private _platformId: Object) {}

    setMetaDescription(content: string) {
        this.meta.updateTag({
            property: 'description',
            content: content,
        });

        this.meta.updateTag({
            name: 'description',
            content: content,
        });
    }

    setMetaTitle(title: string) {
        this.titleService.setTitle(title);
    }

    setMetaOgTitle(content: string) {
        this.meta.updateTag({
            property: 'og:title',
            content: content,
        });
    }

    setMetaOgDescription(content: string) {
        this.meta.updateTag({
            property: 'og:description',
            content: content,
        });
    }

    setMetaOgUrl(content: string) {
        this.meta.updateTag({
            property: 'og:url',
            content: content,
        });
    }

    setMetaOgImage(content: string) {
        this.meta.updateTag({
            property: 'og:image',
            content: content,
        });
    }

    setMetaTwitterTitle(content: string) {
        this.meta.updateTag({
            name: 'twitter:title',
            content: content,
        });
    }

    setMetaTwitterDescription(content: string) {
        this.meta.updateTag({
            name: 'twitter:description',
            content: content,
        });
    }

    setMetaTwitterImage(content: string) {
        this.meta.updateTag({
            name: 'twitter:image',
            content: content,
        });
    }

    updateCanonicalLink(content: string) {
        const canonicalTag = this.meta.getTag('rel="canonical"');
        if (canonicalTag) {
            this.meta.updateTag({ rel: 'canonical', href: content });
        } else {
            this.meta.addTag({ rel: 'canonical', href: content });
        }
    }

    updateCanonicalUrl(url: string) {
        if(isPlatformBrowser(this._platformId)) {
            const head = document.getElementsByTagName('head')[0];

            let element: HTMLLinkElement = <HTMLLinkElement> document.querySelector(
                `link[rel='canonical']`
            );
            if (element == null) {
                element = document.createElement('link') as HTMLLinkElement;
                head.appendChild(element);
            }
            element.setAttribute('rel', 'canonical');
            element.setAttribute('href', url);
        }
    }
}
