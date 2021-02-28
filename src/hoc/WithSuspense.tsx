import React, {FC, PropsWithChildren, Suspense} from "react";
import {Center} from "../components/ui/Center";
import {CircularProgress} from "@material-ui/core";

const withSuspense = <P extends object>(Component: FC<P>) => {
    return (props: PropsWithChildren<any>) => {
        return (
            <Suspense fallback={
                <Center>
                    <CircularProgress/>
                </Center>
            }>
                <Component {...props}/>
            </Suspense>
        );
    };
}

export default withSuspense;
