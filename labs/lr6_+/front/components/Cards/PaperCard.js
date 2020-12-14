import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  Button,
  CardActions,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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
  const {
    handleBuy,
    handleSell,
    handleAdd,
    data,
    handleOpen,
    count: userCount,
  } = props;
  const {
    id,
    name,
    rule,
    max,
    price,
    startPrice,
    count,
    availableCount,
    owners,
  } = data;
  const classes = useStyles();

  return (
    // <Card className={classes.root}>
    //     <CardActionArea onClick={handleOpen}>
    //         {/* <CardMedia
    //             className={classes.media}
    //             image={img}
    //             title="Contemplative Reptile"
    //         /> */}
    //         <CardContent>
    //             <Typography gutterBottom variant="h5" component="h2">
    //                 Компания: {name}
    //             </Typography>
    //             <Typography variant="body1" component="p">
    //                 Цена: {price}
    //             </Typography>
    //             <Typography variant="body2" color="textSecondary" component="p">
    //                 Стартовая цена: {startPrice}
    //             </Typography>
    //             <Typography variant="body1" component="p">
    //                 Количество: {count}
    //             </Typography>
    //             <Typography variant="body2" color="textSecondary" component="p">
    //                 Еще не куплено: {availableCount}
    //             </Typography>
    //             {userCount &&
    //                 <Typography variant="body1" component="p">
    //                     Куплено этих акций: {userCount}
    //                 </Typography>
    //             }
    //         </CardContent>
    //     </CardActionArea>
    //     <CardActions>
    //         {handleBuy &&
    //             <Button size="small" color="primary" onClick={handleBuy}>
    //                 Купить еще
    //             </Button>}
    // {handleSell &&
    //     <Button size="small" color="primary" onClick={handleSell}>
    //         Продать
    //     </Button>}
    //         {handleAdd &&
    //             <Button size="small" color="primary" onClick={handleAdd}>
    //                 Добавить
    //             </Button>}
    //     </CardActions>
    // </Card>
    <TableRow>
      <TableCell onClick={handleOpen}>{name}</TableCell>
      <TableCell align="right">{price}</TableCell>
      <TableCell align="right">{startPrice}</TableCell>
      <TableCell align="right">{count}</TableCell>
      <TableCell align="right">{availableCount}</TableCell>
      {userCount && <TableCell align="right">{userCount}</TableCell>}
      <TableCell align="right">
        {handleBuy && (
          <Button size="small" color="primary" onClick={handleBuy}>
            Купить еще
          </Button>
        )}
      </TableCell>
      <TableCell align="right">
        {" "}
        {handleSell && (
          <Button size="small" color="primary" onClick={handleSell}>
            Продать
          </Button>
        )}
      </TableCell>
      {/* <TableCell align="right">{userCount}</TableCell> */}
    </TableRow>
  );
};

export default PaperCard;
