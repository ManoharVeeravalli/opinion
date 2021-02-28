import React from 'react';
import Box from "@material-ui/core/Box";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {useFirestore, useFirestoreCollectionData} from "reactfire";
import {OpinionModel} from "../../model/opinion.modal";
import Opinion from "../Opinion";
import {Suspense} from "react";
import OpinionLoading from "../OpinionLoading";
import Grid from "@material-ui/core/Grid";
import withSuspense from "../../hoc/WithSuspense";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

function Opinions() {
    const classes = useStyles();
    const opinionsRef = useFirestore().collection("opinions").orderBy('createdOn', 'desc');
    const {data} = useFirestoreCollectionData<OpinionModel>(opinionsRef, {idField: 'id', suspense: true});
    return (
        <Box className={classes.root}>
            <Grid container>
                {
                    data.map(
                        ({
                             description, title, uid, id, opinions,
                             createdOn, updatedOn, imageURL
                         }) =>
                            <Grid xl={4} md={6} sm={12} key={id} item>
                                <Suspense fallback={<OpinionLoading/>}>
                                    <Opinion
                                        imageURL={imageURL}
                                        description={description}
                                        title={title} uid={uid}
                                        createdOn={createdOn}
                                        updatedOn={updatedOn}
                                        key={id}
                                        id={id}
                                        opinions={opinions}
                                    />
                                </Suspense>
                            </Grid>
                    )
                }
            </Grid>
        </Box>
    );
}

export default withSuspense(Opinions);
