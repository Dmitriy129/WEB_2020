import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyle = makeStyles((theme) => ({
    btn: {
        margin: theme.spacing(0.5)
    }
}));

export default function ButtonsList(props) {
    const { list } = props

    const classes = useStyle()
    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="baseline"
        >
            {list.map(({ text, onClick, active }) =>
                <Button variant="contained" className={classes.btn} color={active ? "secondary" : "primary"} onClick={onClick} key={text}>
                    {text}
                </Button>
            )}
        </Grid>
    )
}
