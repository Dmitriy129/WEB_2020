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
  Box,
} from "@material-ui/core";
import { Face as FaceIcon } from "@material-ui/icons";
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

const UserCard = (props) => {
  const { data, count, paperPrice, handleOpen } = props;
  const {
    id,
    login,
    name,
    surname,
    balance,
    img,
    confirmed,
    balanceInPaper,
  } = data;
  const classes = useStyles();
  return (
      <TableRow >
        <TableCell onClick={handleOpen} >{login}</TableCell>
        <TableCell align="right">{name}</TableCell>
        <TableCell align="right">{balance}</TableCell>
        <TableCell align="right">{balanceInPaper}</TableCell>
        {count != undefined && (
          <>
            <TableCell align="right">{count}</TableCell>
            <TableCell align="right">{paperPrice * count}</TableCell>
          </>
        )}
      </TableRow>
    // <Card className={classes.root}>
    //     <CardActionArea
    //         onClick={handleOpen}
    //     >
    //         {confirmed
    //             ? <>
    //                 <CardMedia
    //                     className={classes.media}
    //                     image={img}
    //                     title="Contemplative Reptile"
    //                 />
    //                 <CardContent>
    //                     <Typography variant="body1" component="p">
    //                         {login}
    //                     </Typography>
    //                     <Typography variant="body2" color="textSecondary" component="p">
    //                         {name} {surname}
    //                     </Typography>
    //                     <Typography variant="body1" component="p">
    //                         Шекелей: {balance}
    //                     </Typography>
    //                     <Typography variant="body2" color="textSecondary" component="p">
    //                         Шекелей в акциях: {balanceInPaper}
    //                     </Typography>
    //                     {count != undefined &&
    //                         <>
    //                             < Typography variant="body1" component="p">
    //                                 Куплено этих акций: {count}
    //                             </Typography>
    //                             <Typography variant="body2" color="textSecondary" component="p">
    //                                 Шекелей в данном виде акций: {paperPrice * count}
    //                             </Typography>
    //                         </>
    //                     }
    //                 </CardContent>
    //             </>
    //             : <>
    //                 <FaceIcon
    //                     className={classes.media}
    //                     // image={img}
    //                     title="Contemplative Reptile"
    //                 />
    //                 <CardContent>
    //                     <Typography gutterBottom variant="h5" component="h2">
    //                         {id}: Не подтвержден
    //                 </Typography>
    //                 </CardContent>
    //             </>
    //         }
    //     </CardActionArea>
    //     {/* Если адмит, то видно, надо логику добавить
    //     <CardActions>
    //         <Button size="small" color="primary">
    //             Действия
    //         </Button>
    //         <Button size="small" color="primary">
    //             Что-то еще
    //   </Button>
    //     </CardActions> */}
    // </Card >
  );
};

export default UserCard;
