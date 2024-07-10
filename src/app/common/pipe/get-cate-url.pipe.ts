import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../model/category.model';

@Pipe({
    name: 'getCateUrl',
    standalone: true,
})
export class GetCateUrlPipe implements PipeTransform {
    transform(item: Category, type: string): string {
        let url: string = '';

        switch (item.type) {
            case '01C30':
                if(type === "L") {
                    url = `/product/list/${item.id}/${item.url}`;
                } else {
                    url = `/product/list/${item.id}/${item.url}`;
                }
                break;
            case '01C20': case '01C10':
                if(type === 'L') {
                    url = `/post/list/${item.id}/${item.url}`;
                } else {
                    url = `/post/${item.id}/${item.url}`;
                }
                break;
        }
        return url;
    }
}
