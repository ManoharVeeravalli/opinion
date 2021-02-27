export interface OpinionModel {
    description: string;
    title: string;
    uid: string;
    id: string;
    opinions: { [key: string]: boolean }
}
