import React, {useMemo} from 'react';
import {OpinionModel} from "../model/opinion.modal";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Badge from '@material-ui/core/Badge';
import {useFirestore} from "reactfire";
import {useCurrentUser} from "../hooks/auth.hook";

const Opinion: React.FC<OpinionModel> = ({description, title, id, opinions, uid}) => {
    const opinionRef = useFirestore().collection("opinions").doc(id);
    const currentUser = useCurrentUser();
    const [agree, disagree] = useMemo(() => {
        const values = Object.values(opinions);
        return [values.filter(value => value)?.length, values.filter(value => !value)?.length];
    }, [opinions]);
    return (
        <Grid container>
            <Grid item xs={12} container direction="row"
                  justify="space-between"
                  alignItems="center">
                <Grid>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </Grid>
                <Grid>
                    {currentUser?.uid === uid
                        ?
                        <Button variant="outlined" color="secondary" onClick={async () => {
                            await opinionRef.delete();
                        }
                        }>
                            DELETE
                        </Button>
                        : null
                    }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Badge badgeContent={agree} color="primary">
                    <Button color="primary"
                            disabled={!currentUser}
                            onClick={async () => {
                                if (!currentUser?.uid) return;
                                const o: { [key: string]: boolean } = {};
                                o[currentUser.uid] = true;
                                await opinionRef.update({opinions: o});
                            }}
                    >
                        AGREE
                    </Button>
                </Badge>
                <Badge badgeContent={disagree} color="secondary">
                    <Button color="secondary"
                            disabled={!currentUser}
                            onClick={async () => {
                                if (!currentUser?.uid) return;
                                const o: { [key: string]: boolean } = {};
                                o[currentUser.uid] = false;
                                await opinionRef.update({opinions: o});
                            }}>
                        DISAGREE
                    </Button>
                </Badge>
            </Grid>
        </Grid>
    );
};
export default Opinion;
