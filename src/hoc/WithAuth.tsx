import React, {FC, PropsWithChildren} from 'react';
import {Center} from "../components/ui/Center";
import Typography from "@material-ui/core/Typography";
import {AuthCheck, useAuth, useUser} from "reactfire";
import withSuspense from "./WithSuspense";

const withAuth = <P extends object>(Component: FC<P>) => {
    return withSuspense((props: PropsWithChildren<any>) => {
        useUser(useAuth(), {suspense: true});
        return (
            <AuthCheck
                fallback={
                    <Center><Typography>Please sign in to continue...</Typography></Center>
                }>
                <Component {...props}/>
            </AuthCheck>
        );
    });
}
export default withAuth;
