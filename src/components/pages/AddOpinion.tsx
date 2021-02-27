import React, {useEffect, useState} from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {useFirestore} from "reactfire";
import {useCurrentUser} from "../../hooks/auth.hook";
import withAuth from "../../hoc/WithAuth";
import {useDialog} from "../../hooks/dialog.hook";
import firebase from "firebase/app";
import {useHistory, useParams} from "react-router";
import {OpinionModel} from "../../model/opinion.modal";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

function AddOpinion() {
    const classes = useStyles();
    const history = useHistory();
    const {id} = useParams() as any;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const opinionsRef = useFirestore().collection("opinions");
    const currentUser = useCurrentUser();
    const dialog = useDialog();
    useEffect(() => {
        if (!id) {
            return;
        }
        (async () => {
            try {
                const snapshot = await opinionsRef.doc(id).get();
                const opinion = snapshot.data() as OpinionModel;
                setTitle(opinion.title);
                setDescription(opinion.description);
                setImageURL(opinion.imageURL);
            } catch (e) {
                console.error(e);
                return dialog({
                    open: true,
                    description: 'Some thing went wrong, Please try again later',
                    title: 'Alert'
                });
            }
        })();
    }, []);
    const submit = async () => {
        if (!title || !description || !imageURL) {
            return dialog({open: true, description: 'Please provide some value', title: 'Alert'});
        }
        try {
            let o: any = {
                title,
                description,
                uid: currentUser?.uid,
                updatedOn: firebase.firestore.FieldValue.serverTimestamp(),
                imageURL: imageURL
            };
            if (!id) {
                o = {...o, createdOn: firebase.firestore.FieldValue.serverTimestamp()}
                await opinionsRef.add(o);
            } else {
                await opinionsRef.doc(id).update(o);
            }
            history.push('/');
        } catch (e) {
            console.error(e);
            return dialog({open: true, description: 'Some thing went wrong, Please try again later', title: 'Alert'});
        }
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
                        <TextField type={'url'} fullWidth={true} label="ImageURL" value={imageURL}
                                   onChange={e => setImageURL(e.target.value)}/>
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
