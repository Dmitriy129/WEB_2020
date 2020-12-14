import React, { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { useRouter } from "next/router";
import { Grid, makeStyles, Modal } from "@material-ui/core";
import UserCard from "../Cards/UserCard";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    outline: "none",
  },
}));

const OwnersOfPaper = (props) => {
  const { paper, open, onClose } = props;
  const classes = useStyles();

  const list = paper?.owners?.map(({ user: elem, count }) => (
      <UserCard data={elem} count={count} paperPrice={paper.price} />
  ));

  return (
    <Modal open={open} onClose={onClose} className={classes.root}>
      {/* <Grid
                container
                direction="row"
                justify="space-between"
                alignContent="space-between"
                spacing={2}
                className={classes.content}
            >
                {list}

            </Grid> */}
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Логин</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Баланс</TableCell>
              <TableCell>В акциях</TableCell>
              <TableCell>Куплено этих акций</TableCell>
              <TableCell>В данном виде акций</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{list}</TableBody>
        </Table>
      </TableContainer>
    </Modal>
  );
};

export default inject("users")(observer(OwnersOfPaper));
