import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react';
import { useRouter } from 'next/router';
import { Grid, makeStyles, Modal } from '@material-ui/core';
import UserCard from '../Cards/UserCard';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
    },
    content: {
        outline: "none",
    }
}))

const OwnersOfPaper = (props) => {
    const { paper, open, onClose } = props
    const classes = useStyles()




    const list = paper?.owners?.map(({ user: elem, count }) =>
        <Grid
            item
            key={elem.id}
        >
            <UserCard data={elem} count={count} />
        </Grid>)


    return (
        <Modal open={open} onClose={onClose} className={classes.root}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignContent="space-between"
                spacing={2}
                className={classes.content}
            >
                {list}

            </Grid>
        </Modal>
    )
}

export default inject('users')(observer(OwnersOfPaper))