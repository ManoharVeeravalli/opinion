import React, {useState} from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {useFirestore} from "reactfire";
import {useCurrentUser} from "../../hooks/auth.hook";
import withAuth from "../../hoc/WithAuth";
import {useDialog} from "../../hooks/dialog.hook";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

function AddOpinion() {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const opinionsRef = useFirestore().collection("opinions");
    const currentUser = useCurrentUser();
    const dialog = useDialog();
    const submit = async () => {
        if (!title || !description) {
            return dialog({open: true, description: 'Please provide some value', title: 'Alert'});
        }
        await opinionsRef.add({title, description, uid: currentUser?.uid});
        setTitle('');
        setDescription('');
    }
    return (
        <form noValidate autoComplete="off">
            <Box m={5} className={classes.root}>
                <Grid container spacing={5}>
                    <Grid item xs={12}>
                        <TextField fullWidth={true} label="Title" value={title}
                                   onChange={e => setTitle(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField multiline rows={4} fullWidth={true} label="Description" value={description}
                                   onChange={e => setDescription(e.target.value)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" onClick={submit}>
                            Add Opinion
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}

export default withAuth(AddOpinion);
