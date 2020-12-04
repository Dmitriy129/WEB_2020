import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, CircularProgress } from '@material-ui/core';
import SignIn from './AuthManager'


const useStyle = makeStyles(() => ({
    root: {
        width: "100vw",
        height: "100vh",
    },
}));


export default function AuthContainer() {
    const [loading, setLoading] = useState(false)
    const classes = useStyle();

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.root}
            direction="column"

        >
            <Grid
                item
                xs={8}
                md={6}
                lg={4}
            >
                <Box
                    borderRadius={16}
                    boxShadow={3}
                    p={1}
                    pt={2}
                    position="relative"
                >
                    {loading &&
                        <Box
                            borderRadius={16}
                            boxShadow={3}
                            m={-1}
                            mt={-2}
                            width="100%"
                            height="100%"
                            position="absolute"
                            bgcolor="#c4c4c455"
                            zIndex={2}
                            display="flex"
                        >
                            <Box
                                m="auto"
                                component={CircularProgress} />
                        </Box>}
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                        direction="column"
                    >
                        <SignIn setLoading={setLoading} />
                    </Grid>
                </Box>
            </Grid>
        </Grid >

    );
}


