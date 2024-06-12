import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class SeoService {
    constructor(private meta: Meta, private titleService: Title) {}

    setMetaDescription(content: string) {
        this.meta.updateTag({
            property: 'description',
            content: content,
        });
    }

    setMetaTitle(title: string) {
        this.titleService.setTitle(title);
    }

    setMetaOgTitle(content: string) {
        this.meta.updateTag({
            property: 'og:title',
            content: content
        });
    }

    setMetaOgDescription(content: string) {
        this.meta.updateTag({
            property: 'og:description',
            content: content
        });
    }

    setMetaOgUrl(content: string) {
        this.meta.updateTag({
            property: 'og:url',
            content: content
        });
    }

    setMetaTwitterTitle(content: string) {
        this.meta.updateTag({
            name: 'twitter:title',
            content: content
        });
    }

    setMetaTwitterDescription(content: string) {
        this.meta.updateTag({
            name: 'twitter:description',
            content: content
        });
    }
}
