import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Modal, Card, Typography, TextField, Box } from '@material-ui/core';
import { Done as DoneIcon, Close as CloseIcon, } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        outline: "none",
        // minWidth: theme.spacing(100),
        padding: theme.spacing(1),
        textAlign: "center"
    },
    dangerBtn: {
        backgroundColor: "#ff3d00",
        '&:hover': {
            backgroundColor: "#c30000",
        }
    },

}));

export default function Row(props) {
    // const [open, setOpen] = useState(false)
    const [count, setCount] = useState(0)
    const { open, handleClose, handleAgree } = props;
    const classes = useStyles()
    const onAgree = (event) => {
        handleClose()
        handleAgree(count)
    }
    const onDisagree = (event) => {
        handleClose()
    }


    return (
        <>
            <Modal
                open={open}
                className={classes.modal}
                onClose={handleClose}
            >
                <Card className={classes.card}>
                    {/* <Typography> Удалить? </Typography> */}
                    <Typography variant="h6"> Сколько надо купить? </Typography>
                    <Typography component="div"> Введите количество для продолжения. </Typography>
                    <Box my={2}>
                        <TextField
                            value={count}
                            error={parseInt(count) === count}
                            onChange={(event) => setCount(event.target.value)}
                            // helperText={count === confirmAns ? ' ' : `Введите ${confirmAns}`}
                            placeholder="сколько надо?"
                            width="80%"
                            type="number"
                            inputProps={{
                                min: 0,
                                step: 1
                            }}
                        />

                    </Box>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                    >

                        <Button
                            variant="contained"
                            color="secondary"
                            endIcon={<DoneIcon />}
                            onClick={onAgree}
                            disabled={parseInt(count) === count}
                        >
                            Подтвердить
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.dangerBtn}
                            endIcon={<CloseIcon />}
                            onClick={onDisagree}
                        >
                            Отменить
                        </Button>
                    </Grid>
                </Card>
            </Modal>
        </>
    );
}
