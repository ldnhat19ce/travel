import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'normalizeVi',
    standalone: true,
})
export class NormalizeViPipe implements PipeTransform {
    transform(value: string): string {
        let str = value.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");

        str = str.replace(/[^a-zA-Z0-9 ]/g, "");
        str = str.replace(/\W+/g, ' ');
        str = str.replace(/\s/g, '-');

        return str;
    }
}
