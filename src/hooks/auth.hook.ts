import firebase from "firebase/app";
import {useAuth, useFirebaseApp} from "reactfire";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/auth.context";

const {GoogleAuthProvider} = firebase.auth;

function useAuthentication(provider: firebase.auth.AuthProvider) {
    const auth = useAuth(useFirebaseApp());
    return [
        useCallback(async () => {
            await auth.signInWithRedirect(provider);
        }, [auth, provider]),
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

export function useCurrentUser(): firebase.UserInfo | null {
    return useContext(AuthContext);
}

