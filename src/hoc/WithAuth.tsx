import React, {PropsWithChildren, useContext, FC} from 'react';
import {AuthContext} from "../context/auth.context";
import {Center} from "../components/ui/Center";
import Typography from "@material-ui/core/Typography";


const withAuth = <P extends object>(Component: FC<P>) => {
    return (props: PropsWithChildren<any>) => {
        const currentUser = useContext(AuthContext);
        if (currentUser) {
            return <Component {...props}/>;
        }
        return <Center><Typography>Please sign in to continue</Typography></Center>;
    };
}

export default withAuth;
