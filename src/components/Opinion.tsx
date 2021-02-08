import React from 'react';
import {OpinionModel} from "../model/opinion.modal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Badge from '@material-ui/core/Badge';
import {useFirestore} from "reactfire";
import firebase from "firebase";
import {useCurrentUser} from "../hooks/auth.hook";

const Opinion: React.FC<OpinionModel> = ({description, title, id, agree, disagree}) => {
    const opinionRef = useFirestore().collection("opinions").doc(id);
    const currentUser = useCurrentUser();

    return (
        <Grid container>
            <Grid item xs={12}>
                <h1>{title}</h1>
                <p>{description}</p>
            </Grid>
            <Grid item xs={12}>
                <Badge badgeContent={agree} color="primary">
                    <Button color="primary"
                            disabled={!currentUser}
                            onClick={() => opinionRef.update({agree: firebase.firestore.FieldValue.increment(1)})}>
                        AGREE
                    </Button>
                </Badge>
                <Badge badgeContent={disagree} color="secondary">
                    <Button color="secondary"
                            disabled={!currentUser}
                            onClick={() => opinionRef.update({disagree: firebase.firestore.FieldValue.increment(1)})}>
                        DISAGREE
                    </Button>
                </Badge>
            </Grid>
        </Grid>
    );
}

export default Opinion;
