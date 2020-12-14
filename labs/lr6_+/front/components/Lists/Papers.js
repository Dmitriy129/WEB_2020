import React, { useContext, useEffect, useState } from "react";
import { Grid, LinearProgress, Button } from "@material-ui/core";
import { observer, inject } from "mobx-react";
import PaperCard from "../Cards/PaperCard";
import ModalQuestion from "./ModalQuestion";
import OwnersOfPaper from "../CurrentList/OwnersOfPaper";
import EmiterContext from "../Emiter/EmiterContext";
import ws from "../../src/api/ws";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Papers = (props) => {
  const {
    loadList,
    elems,
    loading: { now: nowLoading },
    // tryBuyPapers
    tryBuy,
    trySell,
    tryAdd,
  } = props.papers;

  const {
    me: {
      user: { role },
    },
  } = props;

  const [modalQ, setModalQ] = useState({ open: false, id: "", var: 1 });
  const [modalUsers, setModalUsers] = useState({ open: false, id: 0 });
  const { error: showError, warn: showWarning } = useContext(EmiterContext);
  useEffect(() => {
    loadList();

    ws.on("priceUpdated", loadList);
    return () => {
      ws.off("priceUpdated", loadList);
    };
  }, []);

  const openModalForCard = (id, v) => {
    debugger;
    setModalQ({ open: true, id, var: v });
  };

  const handleAgree = (count, v) => {
    if (v === 1)
      tryBuy({ id: modalQ.id, count }).catch((error) =>
        showError("Не получилось купить", error)
      );
    else if (v === 2)
      trySell({ id: modalQ.id, count }).catch((error) =>
        showError("Не получилось продать", error)
      );
    else if (v === 3)
      tryAdd({ id: modalQ.id, count }).catch((error) =>
        showError("Не получилось добавить", error)
      );
  };
  // const handleAgree2 = (count) => {
  //     trySell({ id: modalQ.id, count })
  //         .catch(error => showError("Не получилось продать", error))
  //     // ws.emit("tryBuyPapers", { id: modalQ.id, count })
  // }

  const handleOpen = (idx) => {
    if (elems[idx]?.owners?.length > 0) setModalUsers({ open: true, id: idx });
    else showWarning("Эти акции еще никто не купил");
  };

  const list = elems.map((elem, idx) => (
    <PaperCard
      data={elem}
      handleBuy={() => openModalForCard(elem.id, 1)}
      handleSell={() => openModalForCard(elem.id, 2)}
      handleAdd={role === "admin" && (() => openModalForCard(elem.id, 3))}
      handleOpen={() => handleOpen(idx)}
    />
  ));

  if (nowLoading) return <LinearProgress />;

  return (
    <>
      {/* <Grid
                container
                direction="row"
                justify="space-between"
                alignContent="space-between"
                spacing={2}
            >
                {list}
            </Grid> */}
      <TableContainer component={Paper}>
        <Table
          //   className={classes.table}
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
              <TableCell>
                {/* <Button onClick={() => openModalForCard(elem.id, 1)}>
                  Купить
                </Button> */}
                Купить
              </TableCell>
              <TableCell>
                {/* <Button onClick={() => openModalForCard(elem.id, 2)}>
                  Продать
                </Button> */}
                Продать
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{list}</TableBody>
        </Table>
      </TableContainer>
      <ModalQuestion
        open={modalQ.open}
        handleAgree={(count) => handleAgree(count, modalQ.var)}
        handleClose={() => setModalQ({ open: false })}
      ></ModalQuestion>
      <OwnersOfPaper
        open={modalUsers.open}
        paper={elems[modalUsers.id]}
        onClose={() => setModalUsers({ open: false })}
      />
      {/* <ModalQuestion open={modalQ.open} handleAgree={handleAgree2} handleClose={() => setModalQ({ open: false })}></ModalQuestion> */}
    </>
  );
};

export default inject("papers", "me")(observer(Papers));
