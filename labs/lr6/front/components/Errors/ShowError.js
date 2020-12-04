import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Modal } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
    Edit as EditIcon,
    DoneAll as DoneAllIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        outline: "none",
        minWidth: theme.spacing(40),
        padding: theme.spacing(1),
    },

}));

const ShowError = (props) => {
    const { error: { show, title, msg }, onClose } = props
    const classes = useStyles()

    return (
        <Modal
            open={!!show}
            onClose={onClose}
            className={classes.modal}
        >
            <Alert severity="error" className={classes.card}>
                <AlertTitle>{title}</AlertTitle>
                {msg}
            </Alert>
        </Modal>
    )
}
export default ShowError