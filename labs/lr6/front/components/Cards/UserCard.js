import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography, Button, CardActions } from "@material-ui/core"
import { Face as FaceIcon } from '@material-ui/icons';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 340,
        width: 340,
    },
});


const UserCard = (props) => {
    const { id, login, name, surname, balance, img, confirmed } = props.data
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardActionArea>
                {confirmed
                    ? <>
                        <CardMedia
                            className={classes.media}
                            image={img}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography variant="body1" component="p">
                                {login}
                                {/* Шекелей: {balance} */}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {name} {surname}
                                {/* Шекелей: {balance} */}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {/* {name} {surname} */}
                                Шекелей: {balance}
                            </Typography>
                        </CardContent>
                    </>
                    : <>
                        <FaceIcon
                            className={classes.media}
                            // image={img}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {id}: Не подтвержден
                        </Typography>
                        </CardContent>
                    </>
                }
            </CardActionArea>
                Если адмит, то видно, надо логику добавить
            <CardActions>
                <Button size="small" color="primary">
                    Действия
                </Button>
                <Button size="small" color="primary">
                    Что-то еще
          </Button>
            </CardActions>
        </Card>
    )
}

export default UserCard
