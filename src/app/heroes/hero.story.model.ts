import { IModel } from './../modules/core/db/entity.model';

export enum TemplateType {
    leftimage = 0,
    rightimage,
    topbottom
}

export class Coordinates {
    x:number;
    y:number;
}

export class HeroStory implements IModel {
    id:string;
    title:string;
    story:string;
    templateType:TemplateType;
    coordinates:Coordinates;
    imageUrl:string;
}