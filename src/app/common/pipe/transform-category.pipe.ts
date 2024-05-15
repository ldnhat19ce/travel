import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../model/category.model';

@Pipe({
    name: 'transformCategory',
    standalone: true,
})
export class TransformCategoryPipe implements PipeTransform {
    transform(value: Category, currentLang: string): string {
        switch (currentLang) {
            case 'vn':
                return value.name;

            case 'us':
                return value.nameEng;

            default:
                return value.name;
        }
    }
}
