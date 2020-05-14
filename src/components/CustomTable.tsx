import React, { FunctionComponent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import {
  CssBaseline,
  Paper,
  Table,
  TableRow,
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TablePagination,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { AddBox as AddBoxIcon } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';

import theme from 'core/theme';
import { NameSpaces as NS } from 'constants/i18n';
import ConfirmDialog from 'components/ConfirmDialog';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  tablePagination: {
    backgroundColor: theme.palette.grey[200],
  },
  tableHeader: {
    backgroundColor: theme.palette.secondary.main,
  },
});

interface ColumnProps {
  id: string;
  label: string;
  minWidth?: number;
  align?: any;
  i18nKey?: string;
}

interface TableProps {
  rows: Array<any>;
  columns: Array<ColumnProps>;
  delCallback: Function;
  setEditRecord?: Function
}

const useToolbarStyles = makeStyles(() => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}));

const TableToolbar = () => {
  const classes = useToolbarStyles();
  const { t } = useTranslation([NS.LOGIN]);
  const history = useHistory();

  return (
    <>
      <Toolbar>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Table
        </Typography>
        <Tooltip title={t(`${NS.COMMON}:label.addRecord`)}>
          <IconButton
            aria-label="filter list"
            onClick={() => {
              history.push(`${history.location.pathname}/add`);
            }}
          >
            <AddBoxIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </>
  );
};


const CustomTable: FunctionComponent<TableProps> = ({
  columns, rows, delCallback, setEditRecord,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [recordId, setRecordId] = useState();

  const { t } = useTranslation([NS.LOGIN]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <CssBaseline />
      <Paper className={classes.root}>
        <TableToolbar />
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key="1">
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className={clsx(classes.tableHeader, {
                      minWidth: column.minWidth,
                    })}
                  >
                    {column.i18nKey ? t(`${column.i18nKey}`) : column.label}
                  </TableCell>
                ))}
                <TableCell
                  className={clsx(classes.tableHeader, {
                    minWidth: 40,
                  })}
                  align="right"
                >
                  {t(`${NS.COMMON}:label.actions`)}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableRow hover role="checkbox" tabIndex={-1} key={`row_${page}_${index}`}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="right">
                      <Button
                        color="primary"
                        size="small"
                        onClick={() => {
                          setEditRecord(row);
                          history.push(`${history.location.pathname}/edit`);
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        color="primary"
                        size="small"
                        onClick={() => {
                          setConfirmOpen(true);
                          setRecordId(row.id);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          classes={{ root: classes.tablePagination }}
          rowsPerPageOptions={[10, 25, 100]}
          labelRowsPerPage={t(`${NS.COMMON}:label.rowsPerPage`)}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <ConfirmDialog
          title={t(`${NS.COMMON}:label.deleteRecord`)}
          open={confirmOpen}
          setOpen={setConfirmOpen}
          onConfirm={() => delCallback(recordId)}
        >
          {t(`${NS.COMMON}:messages.deleteConfirm`)}
        </ConfirmDialog>
      </Paper>
    </>
  );
};

export default CustomTable;
