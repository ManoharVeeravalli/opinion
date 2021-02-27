import React from 'react';
import Box from "@material-ui/core/Box";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {Center} from "../ui/Center";
import {CircularProgress} from "@material-ui/core";
import {OpinionModel} from "../../model/opinion.modal";
import Opinion from "../Opinion";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);
export default function Opinions() {
    const classes = useStyles();
    const opinionsRef = useFirestore().collection("opinions");
    const {status, data} = useFirestoreCollectionData<OpinionModel>(opinionsRef, {idField: 'id'});
    if (status === "loading") {
        return <Center><CircularProgress/></Center>
    }
    return (
        <Box m={5} className={classes.root}>
            {
                data.map(
                    ({description, title, uid, id, opinions}) =>
                        <Opinion
                            description={description}
                            title={title} uid={uid}
                            key={id}
                            id={id}
                            opinions={opinions}
                        />
                )
            }
        </Box>
    );
}
