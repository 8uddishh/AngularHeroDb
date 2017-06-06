import { IModel } from './../modules/core/db/entity.model';

export class Comic implements IModel {
  id: string;
  name: string;
  thumbnailUrl: string;

  publisherId:string;
  heroIds:string[];
  synopsis:string;
}