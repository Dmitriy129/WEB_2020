import React from 'react'
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography, Button, CardActions } from "@material-ui/core"

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 340,
        width: 340,
    },
});


const PaperCard = (props) => {
    const { handleBuy, handleSell, handleAdd, data, handleOpen, /* count */ } = props
    const { id, name, rule, max, price, startPrice, count, availableCount, owners, } = data
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleOpen}>
                {/* <CardMedia
                    className={classes.media}
                    image={img}
                    title="Contemplative Reptile"
                /> */}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Компания: {name}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Цена: {price}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Стартовая цена: {startPrice}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Количество: {count}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Еще не куплено: {availableCount}
                    </Typography>
                    <Typography variant="body1" component="p">
                        Куплено этих акций: {count}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {handleBuy &&
                    <Button size="small" color="primary" onClick={handleBuy}>
                        Купить еще
                    </Button>}
                {handleSell &&
                    <Button size="small" color="primary" onClick={handleSell}>
                        Продать
                    </Button>}
                {handleAdd &&
                    <Button size="small" color="primary" onClick={handleAdd}>
                        Добавить
                    </Button>}
            </CardActions>
        </Card>
    )
}

export default PaperCard
