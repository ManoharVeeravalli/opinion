import React from 'react';
import {Card, CardContent, CardHeader} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";

function OpinionLoading() {
    return (
        <Box m={2}>
            <Card>
                <CardHeader avatar={
                    <Skeleton animation="wave" variant="circle" width={40} height={40}/>
                }
                            title={
                                <Skeleton animation="wave" height={10} width="80%" style={{marginBottom: 6}}/>
                            }
                            subheader={
                                <Skeleton animation="wave" height={10} width="40%"/>
                            }
                />
                <CardContent>
                    <Skeleton animation="wave" height={10} style={{marginBottom: 6}}/>
                    <Skeleton animation="wave" height={10} width="80%"/>
                </CardContent>

            </Card>
        </Box>
    );
}

export default OpinionLoading;
