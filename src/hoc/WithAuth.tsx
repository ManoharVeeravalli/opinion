import React, {PropsWithChildren, useContext, FC} from 'react';
import {AuthContext} from "../context/auth.context";


const withAuth = <P extends object>(Component: FC<P>) => {
    return (props: PropsWithChildren<any>) => {
        const currentUser = useContext(AuthContext);
        if (currentUser) {
            return <Component {...props}/>;
        }
        return <h1>Please sign in to continue</h1>;
    };
}

export default withAuth;
