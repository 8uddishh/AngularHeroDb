import { IModel } from './../modules/core/db/entity.model';

export enum QuoteEmotion {
    normal = 0,
    anger,
    satire,
    sad,
    disgust,
    joy
}

export class HeroQuote implements IModel {
    id:string;
    name:string;
    emotion:QuoteEmotion;
}