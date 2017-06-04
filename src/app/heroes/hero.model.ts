import { IModel } from './../modules/core/db/entity.model';

export class Hero implements IModel {
  id: string;
  name: string;
  logoUrl: string;
  coverPicUrl: string;

  publisherId:string;

  realName:string;
  about:string;
}
