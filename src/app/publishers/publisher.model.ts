import { IModel } from './../modules/core/db/entity.model';

export class Publisher implements IModel {
    id: string;
    name: string;
    coverPicUrl: string;
    logoUrl: string;
    companyInfo: string;
    colorCode: string;
}