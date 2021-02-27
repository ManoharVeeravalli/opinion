import firebase from "firebase/app";

export interface OpinionModel {
    description: string;
    title: string;
    uid: string;
    id: string;
    imageURL: string;
    opinions: { [key: string]: boolean },
    createdOn: firebase.firestore.Timestamp;
    updatedOn: firebase.firestore.Timestamp;
}
