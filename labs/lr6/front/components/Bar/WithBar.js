import React from 'react'
import Bar from './Bar'
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { BarProvider } from './BarContext'


export default function WithBar(props) {
    const { title } = props
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BarProvider value={{ title }}>
                <Bar />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        {props.children}
                    </Container>
                </main>
            </BarProvider>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        scrollBehavior: "smooth",
        marginTop: theme.spacing(6),
    },

}));


