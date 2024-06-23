export interface Post {
    id: number;
    name: string;
    nameEng: string;
    content: string;
    contentEng: string;
    topImage: string;
    bottomImage: string;
    categoryId: number;
    sort: number;
    modifiedDate: string;
    categoryName: string;
    categoryNameEng: string;
    used: boolean;
    parentCategoryId: number;
    parentCategoryName: string;
    parentCategoryNameEng: string;
}
