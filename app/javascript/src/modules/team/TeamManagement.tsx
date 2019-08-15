import React from 'react'
import clsx from 'clsx'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import {
  Paper,
  Table,
  TableBody,
  TablePagination
} from '@material-ui/core'

import TableToolbar from './components/TableToolbar'
import Searchbar from './components/Searchbar'
import TableHeader from './components/TableHeader'
import DetailPane from './components/DetailPane'
import StyledTableRow from './components/styled/StyledTableRow'
import StyledTableCell from './components/styled/StyledTableCell'
import StyledItem from './components/styled/StyledItem'
import ArrowTooltip from './components/ArrowTooltip'

interface Company {
  url: string;
  label: string;
}

interface Data {
  name: string;
  companies: Company[];
  teams: string[];
  role: string;
}

function createData(
  name: string, 
  companies: Company[], 
  teams: string[], 
  role: string
  ): Data {
  return { name, companies, teams, role }
}

const rows = [
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}, {url: '../assets/img/logos/g2-logo.svg', label: 'Advocately'}], ['Finance', 'Legal', 'Equity', 'Trust & Safety'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}], ['Finance', 'Legal'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}], ['Finance', 'Legal'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}], ['Finance', 'Legal'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}], ['Finance', 'Legal'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}], ['Finance', 'Legal'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
  createData('Guy Number 1', [{url: '../assets/img/logos/g2-logo.svg', label: 'G2 Crowd'}, {url: '../assets/img/logos/drip-logo.svg', label: 'Drip'}], ['Finance', 'Legal'], 'Member'),
  createData('Guy Number 2', [{url: '../assets/img/logos/domo-logo.svg', label: 'Domo'}], ['Finance'], 'Admin'),
]

const panelWidth=594

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    flex: {
      display: 'flex'
    },
    grow: {
      flexGrow: 1
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp, 
        duration: theme.transitions.duration.leavingScreen
      })
    },
    paperShift: {
      width: `calc(100% - ${panelWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut, 
        duration: theme.transitions.duration.enteringScreen
      })
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    table: {
      minWidth: 750
    },
    round: {
      borderRadius: '50%'
    },
    label: {
      color: 'white', 
      fontSize: '12px', 
      fontWeight: 600, 
      textTransform: 'capitalize'
    }
  })
)

export default function TeamManagement(props: {path?: string}) {
  const classes = useStyles()
  const [selected, setSelected] = React.useState<number[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  function handleClick(event: React.MouseEvent<HTMLTableRowElement>, id: number) {
    event.persist()

    if (event.metaKey || event.ctrlKey) {
      const selectedIndex = selected.indexOf(id);
      let newSelected: number[] = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id)
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1))
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1))
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1), 
        )
      }
  
      setSelected(newSelected)
    } else {
      const selectedIndex = selected.indexOf(id)
      let newSelected: number[] = [];

      if (selectedIndex === -1) {
        newSelected.push(id)
      } else if (selectedIndex >= 0 && selected.length > 1) {
        newSelected.push(id)
      }

      setSelected(newSelected)
    }
  }

  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event)
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const isSelected = (id: number) => selected.indexOf(id) !== -1

  const isOpen = () => selected.length > 0

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  const renderTooltipTitle = (options: String[]) => {
    return (
      <React.Fragment>
        { options.map((option: String, index: number) => 
          <p key={index} className={classes.label}>{option}</p>
        )}
      </React.Fragment>
    )
  }

  return (
    <div className={classes.root}>
      <Paper className={clsx(classes.paper, isOpen() && classes.paperShift)} elevation={0}>
        <TableToolbar 
          selected={selected.length}
        />
        <Searchbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="Team Management Table">
            <TableHeader />
            <TableBody>
              { rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: Data, index: number) => {
                  const isItemSelected = isSelected(index)
                  
                  return (
                    <StyledTableRow
                      hover
                      onClick={(event: React.MouseEvent<HTMLTableRowElement>) => handleClick(event, index)}
                      role="team member"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`member-${index}`}
                      selected={isItemSelected}
                    >
                      <StyledTableCell>
                        <div className={classes.flex} style={{alignItems: 'center'}}>
                          <img 
                            className={classes.round} 
                            src="../assets/img/photos/Alana.jpg" 
                            width="30" 
                            height="30" 
                            alt="Alana" 
                          />
                          <span style={{marginLeft: '18px'}}>{row.name}</span>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className={classes.flex}>
                          { row.companies.slice(0, 2).map(company => 
                              <StyledItem 
                                key={`${row.name}-${company.label}`}
                                logo={company.url} 
                                label={company.label} 
                                selected={isItemSelected}
                              />
                            )
                          }
                          { row.companies.length > 2 &&
                            <ArrowTooltip 
                              title={renderTooltipTitle(row.companies.map(a => a.label).slice(2))} 
                              placement="top"
                            >
                              <StyledItem
                                label={`+${row.companies.length - 2}`}
                                selected={isItemSelected}
                              />
                            </ArrowTooltip>
                          }
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className={classes.flex}>
                          { row.teams.slice(0, 2).map(team => 
                              <StyledItem 
                                key={`${row.name}-${team}`}
                                label={team} 
                                selected={isItemSelected}
                              />
                            )                      
                          }
                          { row.teams.length > 2 &&
                            <ArrowTooltip 
                              title={renderTooltipTitle(row.teams.slice(2))} 
                              placement="top"
                            >
                              <StyledItem
                                label={`+${row.teams.length - 2}`}
                                selected={isItemSelected}
                              />
                            </ArrowTooltip>
                          }
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>{row.role}</StyledTableCell>
                    </StyledTableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      <DetailPane open={isOpen()} />
    </div>
  )
}