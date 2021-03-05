import React, {useCallback, useMemo, useRef} from 'react';
import {OpinionModel} from "../model/opinion.modal";
import Badge from '@material-ui/core/Badge';
import {
    useFirebaseApp,
    useFirestore,
    useFirestoreDocData, useUser
} from "reactfire";
import {Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import firebase from "firebase/app";
import moment from "moment";
import Box from "@material-ui/core/Box";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {useHistory} from "react-router";
import {useDialog} from "../hooks/dialog.hook";

const Opinion: React.FC<OpinionModel> = ({
                                             description, title, id, opinions,
                                             uid, createdOn, imageURL
                                         }) => {
    const opinionRef = useFirestore().collection("opinions").doc(id);
    const {data: currentUser} = useUser();
    const history = useHistory();
    const firestore = useFirestore(useFirebaseApp());
    const dialog = useRef(useDialog());
    let userRef = firestore.collection('users').doc(uid);
    const {data: user} = useFirestoreDocData<firebase.UserInfo>(userRef, {suspense: true});
    let avatar = <Avatar src={user.photoURL || ''}>
        {user.displayName?.charAt(0)}
    </Avatar>;
    const onOpinion = useCallback(async (flag: boolean) => {
        if (!currentUser?.uid) return;
        const o: any = {
            updatedOn: firebase.firestore.FieldValue.serverTimestamp()
        };
        o[`opinions.${currentUser.uid}`] = flag;
        try {
            await opinionRef.update(o);
        } catch (e) {
            console.error(e);
            dialog.current({
                open: true,
                description: 'Some thing went wrong, Please try again later',
                title: 'Alert'
            });
        }
    }, [currentUser?.uid, opinionRef]);
    const onAgree = useCallback(async () => {
        await onOpinion(true);
    }, [onOpinion]);
    const onDisagree = useCallback(async () => {
        await onOpinion(false);
    }, [onOpinion])
    const onDelete = useCallback(async () => {
        await opinionRef.delete();
    }, [opinionRef])
    const onEdit = useCallback(async () => {
        history.push(`/opinion/${id}`)
    }, [history, id])
    const [agree, disagree] = useMemo(() => {
        if (!opinions) {
            return [0, 0];
        }
        const values = Object.values(opinions) || [];
        return [values.filter(value => value)?.length, values.filter(value => !value)?.length];
    }, [opinions]);
    let userOpinion = null;
    if (opinions && opinions.hasOwnProperty(currentUser?.uid)) {
        userOpinion = opinions[currentUser.uid];
    }
    return (
        <Box m={0.5}>
            <Card>
                <CardHeader
                    avatar={avatar}
                    title={user.displayName}
                    subheader={moment(createdOn?.toDate()).format('MMMM DD, YYYY')}
                    action={
                        uid === currentUser?.uid ?
                            <>
                                <IconButton aria-label="settings" onClick={onDelete} color={"secondary"}>
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton aria-label="settings" onClick={onEdit}>
                                    <EditIcon/>
                                </IconButton>
                            </>
                            : null
                    }
                />
                <CardMedia
                    component="img"
                    style={{height: 'auto', maxHeight: '400px'}}
                    image={imageURL}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p"
                                dangerouslySetInnerHTML={{__html: description}}>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Badge badgeContent={agree} color="primary">
                        <IconButton onClick={onAgree} color={userOpinion === true ? 'primary' : 'default'}
                                    disabled={!currentUser}>
                            <ThumbUpIcon/>
                        </IconButton>
                    </Badge>
                    <Badge badgeContent={disagree} color="secondary">
                        <IconButton onClick={onDisagree} color={userOpinion === false ? 'secondary' : 'default'}
                                    disabled={!currentUser}>
                            <ThumbDownIcon/>
                        </IconButton>
                    </Badge>
                </CardActions>
            </Card>
        </Box>
    );
};
export default Opinion;
