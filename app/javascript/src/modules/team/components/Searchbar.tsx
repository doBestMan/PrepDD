import React from 'react'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

import Dropdown from '../../../components/Dropdown'
import {CompanyDetails_company_teams} from '../../../graphql/queries/__generated__/CompanyDetails'

const useSearchbarStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      display: 'flex', 
      margin: '24px 31px 42px 31px'
    },
    search: {
      position: 'relative',
      width: '100%',
      height: '42px',
      marginRight: '24px', 
      border: '1px solid #CACACA',
      borderRadius: '3px',
      color: '#D6D6D6',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      flexGrow: 1, 
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      color: '#606060', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      width: '100%', 
      height: 42, 
      fontFamily: 'Montserrat',
      fontSize: '12px',
      fontWeight: 'bold', 
      color: 'black'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 6),
      transition: theme.transitions.create('width'),
      width: '100%',
      height: 42, 
    },
  })
)

export default function Searchbar(props: { data: CompanyDetails_company_teams[] }) {
  const { data } = props
  const classes = useSearchbarStyles()

  const options = data.map(item => {
    const res = {
      label: item.name, 
      value: item.id
    }

    return res
  })

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon fontSize="small" />
        </div>
        <InputBase
          placeholder="Search for team members"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{"aria-label": "search"}}
        />
      </div>
      <Dropdown options={options} placeholder="Select all teams" />
    </div>
  )
}