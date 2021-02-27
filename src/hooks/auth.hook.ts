import firebase from "firebase/app";
import {useAuth, useFirebaseApp, useFirestore} from "reactfire";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/auth.context";

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


let loading = true;

export function useFirebaseAuth(): { currentUser: firebase.UserInfo | null, loading: boolean } {
    const auth = useAuth(useFirebaseApp());
    const [state, setState] = useState({currentUser: auth.currentUser, loading});
    useEffect(() => {
        if (!loading) return;
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            loading = false;
            setState({currentUser, loading});
        });
        return () => unsubscribe();
    }, [auth]);
    return state;
}

export function useCurrentUser(): firebase.UserInfo {
    return useContext(AuthContext) as firebase.UserInfo;
}

