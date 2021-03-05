import React, {useEffect, useRef, useState} from 'react';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {useFirestore, useUser} from "reactfire";
import withAuth from "../../hoc/WithAuth";
import {useDialog} from "../../hooks/dialog.hook";
import firebase from "firebase/app";
import {useHistory, useParams} from "react-router";
import {OpinionModel} from "../../model/opinion.modal";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';


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
    const opinionsRef = useFirestore().collection('opinions');
    const firestore = useFirestore();
    const {data: currentUser} = useUser();
    const dialog = useRef(useDialog());
    useEffect(() => {
        if (!id) {
            return;
        }
        (async () => {
            try {
                const snapshot = await firestore.collection('opinions').doc(id).get();
                const opinion = snapshot.data() as OpinionModel;
                setTitle(opinion.title);
                setDescription(opinion.description);
                setImageURL(opinion.imageURL);
            } catch (e) {
                console.error(e);
                return dialog.current({
                    open: true,
                    description: 'Some thing went wrong, Please try again later',
                    title: 'Alert'
                });
            }
        })();
    }, [dialog, id, firestore]);
    const reset = () => {
        setTitle('');
        setDescription('');
        setImageURL('');
    }
    const submit = async () => {
        if (!title || !description || !imageURL) {
            return dialog.current({open: true, description: 'Please provide some value', title: 'Alert'});
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
            return dialog.current({
                open: true,
                description: 'Some thing went wrong, Please try again later',
                title: 'Alert'
            });
        }
        reset();
    }

    return (
        <form noValidate autoComplete="off">
            <Box m={1} className={classes.root}>
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
                        <ReactQuill value={description} onChange={setDescription}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container justify={"space-between"}>
                            <Button variant="contained" onClick={reset}>
                                Clear
                            </Button>
                            <Button color="primary" variant="contained" onClick={submit}>
                                Add Opinion
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
}

export default withAuth(AddOpinion);
