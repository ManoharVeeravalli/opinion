import React, {ReactNode} from 'react';
import {createStyles, makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() =>
    createStyles({
        center: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        },
    }),
);
export function Center({children}: { children: ReactNode }) {
    const classes = useStyles();
    return (
        <div className={classes.center}>
            {children}
        </div>
    );
}
