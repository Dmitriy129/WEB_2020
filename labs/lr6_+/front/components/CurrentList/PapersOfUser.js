import React from "react";
import { observer, inject } from "mobx-react";
// import { useRouter } from 'next/router';
import { Grid, makeStyles, Modal } from "@material-ui/core";
import PaperCard from "../Cards/PaperCard";

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

const PapersOfUser = (props) => {
  const { user, open, onClose } = props;
  const classes = useStyles();

  const list = user?.papers?.map(({ paper: elem, count }) => (
    <PaperCard data={elem} count={count} />
  ));

  return (
    <Modal open={open} onClose={onClose} className={classes.root}>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Компания</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Стартовая цена</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Еще не куплено</TableCell>
              <TableCell>Куплено этих акций</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{list}</TableBody>
        </Table>
      </TableContainer>
    </Modal>
  );
};

export default inject("users")(observer(PapersOfUser));
