import firebase from "firebase/app";
import {useAuth, useFirebaseApp, useFirestore} from "reactfire";
import {useCallback} from "react";

const {GoogleAuthProvider} = firebase.auth;

function useAuthentication(provider: firebase.auth.AuthProvider) {
    const app = useFirebaseApp();
    const auth = useAuth(app);
    const firestore = useFirestore(app);
    return [
        useCallback(async () => {
            const {additionalUserInfo, user} = await auth.signInWithPopup(provider);
            if (!user) {
                return;
            }
            const {uid, email, photoURL, displayName, phoneNumber} = user;
            if (additionalUserInfo?.isNewUser) {
                await firestore.collection('users').doc(user?.uid).set({
                    uid,
                    email,
                    photoURL,
                    displayName,
                    phoneNumber
                })
            }
        }, [auth, provider, firestore]),
        useCallback(async () => {
            await auth.signOut();
        }, [auth])
    ];
}


export function useGoogleAuthentication() {
    return useAuthentication(new GoogleAuthProvider());
}


