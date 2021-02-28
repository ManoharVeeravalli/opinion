import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {useGoogleAuthentication} from "../hooks/auth.hook";
import {useHistory} from "react-router";
import {useUser} from "reactfire";


const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function Header() {
    const classes = useStyles();
    const history = useHistory();
    const [signIn, signOut] = useGoogleAuthentication();
    const {data: currentUser} = useUser();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit" onClick={() => history.push('/')}>
                            OPINION
                        </Button>
                    </Typography>
                    {currentUser ? <Button color="inherit" onClick={() => history.push('/opinion')}>
                        ADD
                    </Button> : null}
                    <Button color="inherit"
                            onClick={currentUser ? async () => await signOut() : async () => await signIn()}>
                        {currentUser ? 'Sign Out' : 'Sign In'}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
