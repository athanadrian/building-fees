export class BaseModel {
    $key: string;
    dateCreated: string = (new Date()).toISOString();
    dateViewed: Date;
}