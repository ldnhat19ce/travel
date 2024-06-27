export interface Category {
    id: number;
    name: string;
    nameEng: string;
    level: number;
    sort: number;
    type: string;
    parentId: number;
    modifiedAt: string;
    hasChild: number;
    url: string;
    description: string;
    descriptionEng: string;
    imageUrl: string;
}
