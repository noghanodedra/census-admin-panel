import React, { FunctionComponent, useState, ChangeEvent } from 'react';
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
  Button,
  InputBase,

} from '@material-ui/core';
import { AddBox as AddBoxIcon } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

import { NameSpaces as NS } from 'constants/i18n';
import ConfirmDialog from 'components/ConfirmDialog';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  tablePagination: {
    // backgroundColor: theme.palette.grey[200],
  },
  tableHeader: {
    backgroundColor: theme.palette.secondary.light,
  },
}));


interface ColumnProps {
  id: string;
  label: string;
  minWidth?: number;
  align?: any;
  i18nKey?: string;
  nestedProp?:string;
}

interface TableProps {
  rows: Array<any>;
  columns: Array<ColumnProps>;
  delCallback: Function;
  setEditRecord?: Function;
  disableActions?:Boolean;
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    flex: '1 1 100%',
  },
}));

const useSearchBarStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

interface TableToolbarProps {
  searchValue: String;
  handleSearch: any;
  disableActions?:Boolean;
}

const TableToolbar: FunctionComponent<TableToolbarProps> = (props) => {
  const classes = useToolbarStyles();
  const searchBarClasses = useSearchBarStyles();
  const { searchValue, handleSearch, disableActions } = props;

  const { t } = useTranslation([NS.LOGIN]);
  const history = useHistory();

  const getAddButton = () => (
    <>
      <Tooltip title={t(`${NS.COMMON}:label.addRecord`)}>
        <IconButton
          aria-label="add record"
          onClick={() => {
            history.push(`${history.location.pathname}/add`);
          }}
        >
          <AddBoxIcon />
        </IconButton>
      </Tooltip>
    </>);

  return (
    <>
      <Toolbar className={classes.root}>
        <Paper component="form" className={searchBarClasses.root}>
          <InputBase
            className={searchBarClasses.input}
            placeholder={t(`${NS.COMMON}:label.searchRecords`)}
            inputProps={{ 'aria-label': 'search records' }}
            onChange={handleSearch}
            value={searchValue}
          />
          <IconButton type="submit" className={searchBarClasses.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>

        {!disableActions && getAddButton()}
      </Toolbar>
    </>
  );
};


const CustomTable: FunctionComponent<TableProps> = ({
  columns, rows, delCallback, setEditRecord, disableActions,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [recordId, setRecordId] = useState();
  const [filterData, setFilteredData] = useState([...rows]);
  const [searchValue, setSearchValue] = useState('');

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let filteredDatas = [];
    const searchText = event.target.value;
    setSearchValue(searchText);
    filteredDatas = rows.filter((item) => Object.keys(item).some(
      (k) => item[k] != null && item[k].toString().toLowerCase().includes(searchText.toLowerCase()),
    ));
    setFilteredData(filteredDatas);
  };

  const getActionsTableHeader = () => (
    <TableCell
      className={clsx(classes.tableHeader, {
        minWidth: 40,
        display: 'flex',
      })}
      style={{ paddingRight: 60 }}
      align="right"
    >
      {t(`${NS.COMMON}:label.actions`)}
    </TableCell>
  );

  const getActionsTableCell = (row: any) => (
    <TableCell align="right">
      <Tooltip title={t(`${NS.COMMON}:label.editRecord`)}>
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
      </Tooltip>
      <Tooltip title={t(`${NS.COMMON}:label.deleteRecord`)}>
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
      </Tooltip>
    </TableCell>
  );

  return (
    <>
      <CssBaseline />
      <Paper className={classes.root}>
        <TableToolbar handleSearch={handleSearch} searchValue={searchValue} disableActions={disableActions} />
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="table with records">
            <TableHead>
              <TableRow key="t_row_1">
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
                {!disableActions && getActionsTableHeader()}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableRow hover role="checkbox" tabIndex={-1} key={`row_${page}_${index}`}>
                    {columns.map((column) => {
                      const value = column.nestedProp
                        ? row[column.id][column.nestedProp]
                        : row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                    {!disableActions && getActionsTableCell(row)}
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
          count={filterData.length}
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
