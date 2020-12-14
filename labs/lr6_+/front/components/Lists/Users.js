import React, { useEffect, useState, useContext } from "react";
import { Grid, LinearProgress } from "@material-ui/core";
import { observer, inject } from "mobx-react";
import UserCard from "../Cards/UserCard";
import PapersOfUsers from "../CurrentList/PapersOfUser";
import EmiterContext from "../Emiter/EmiterContext";
import ws from "../../src/api/ws";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Users = (props) => {
  const {
    loadList,
    elems,
    loading: { now: nowLoading },
  } = props.users;
  const [modalPapers, setModalPapers] = useState({ open: false, id: 0 });
  const { error: showError, warn: showWarning } = useContext(EmiterContext);

  useEffect(() => {
    loadList();

    ws.on("priceUpdated", loadList);
    return () => {
      ws.off("priceUpdated", loadList);
    };
  }, []);

  const handleOpen = (idx) => {
    if (elems[idx]?.papers?.length > 0) setModalPapers({ open: true, id: idx });
    else showWarning("Еще не участвовал в торгах");
  };

  const list = elems.map((elem, idx) => (
    <UserCard data={elem} handleOpen={() => handleOpen(idx)} />
  ));
  // const list = elems.map(elem => <UserCard key={elem.id} data={elem} />)

  if (nowLoading) return <LinearProgress />;
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          //   className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Логин</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Баланс</TableCell>
              <TableCell>В акциях</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>{list}</TableBody>
        </Table>
      </TableContainer>
      <PapersOfUsers
        open={modalPapers.open}
        user={elems[modalPapers.id]}
        onClose={() => setModalPapers({ open: false })}
      />
    </>
  );
};

export default inject("users")(observer(Users));
