import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbars(props) {
    const classes = useStyles();
    const { msg: { title, msg, type, show }, onClose } = props


    return (
        <div className={classes.root}>
            <Snackbar open={show} autoHideDuration={5000} onClose={onClose}>
                <Alert /* onClose={onClose} */ severity={type}>
                    {title} {msg ? msg + ":" : msg}
                </Alert>
            </Snackbar>
        </div>
    );
}
