import React, {useState, useEffect} from 'react'
import idx from 'idx'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import {
  Card, 
  Typography,
  Grid,
  Table, 
  TableHead,
  TableBody,  
  TableRow, 
  TableCell
} from '@material-ui/core'

import InputForm from './components/InputForm'
import CompanyForm from './components/CompanyForm'
import SwitchForm from './components/SwitchForm'
import StyledTableRow from './components/StyledTableRow'
import StyledTableCell from './components/StyledTableCell'

import {useGlobalState} from '../../../../store'
import {useCompanySettings} from '../../../../graphql/queries/CompanySettings'
import {useUpdateCompany} from '../../../../graphql/mutations/UpdateCompany'
import {CompanySettings_company} from '../../../../graphql/queries/__generated__/CompanySettings'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {

    },
    title: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 'bold', 
      fontSize: '26px'
    },
    table: {
      marginTop: '36px',
    },
    tableTitle: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      fontSize: '21px'
    },
    tableHeadCell: {
      padding: '12px 0px 12px 0px',
      color: '#606060',
      fontFamily: 'Montserrat',
      fontWeight: 600, 
      fontSize: '12px'
    },
    tableBody: {
      color: '#2C2C2C',
      fontFamily: 'Montserrat',
      fontSize: '15px'
    },
    flex: {
      display: 'flex',
      alignItems: 'center'
    },
    grow: {
      flexGrow: 1
    }
  })
)

export default function FormPanel() {
  const classes = useStyles()
  const {state} = useGlobalState()
  const [company, setCompany] = useState<CompanySettings_company>({
    __typename: "Company",
    id: '',
    name: '', 
    parent: null, 
    broker: null,
    totalUsers: 0,
    totalStorage: 0,
    subscription: null,
    autoPdf: false, 
    autoWatermark: false, 
    previewOnly: false
  })
  
  const {data, error, loading} = useCompanySettings({id: state.selectedCompany})

  const [updateCompany] = useUpdateCompany({
    id: company.id, 
    name: company.name, 
    autoPdf: company.autoPdf as boolean, 
    autoWatermark: company.autoWatermark as boolean, 
    previewOnly: company.previewOnly as boolean
  })

  useEffect(() => {
    const companyData = idx(data, data => data.company);

    if (loading || !companyData) return;

    setCompany({
      ...companyData
    })
  }, [idx(data, data => data.company)])

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompany({
      ...company,
      name: event.target.value
    })
  }

  const handleUpdateName = () => {
    updateCompany()
  }

  const handleAutoPDF = () => {
    setCompany({...company, autoPdf: !company.autoPdf})
    updateCompany()
  }

  const handleAutoWatermark = () => {
    setCompany({...company, autoWatermark: !company.autoWatermark})
    updateCompany()
  }

  const handlePreviewOnly = () => {
    setCompany({...company, previewOnly: !company.previewOnly})
    updateCompany()
  }

  return (
    <Card elevation={0}>
      <Typography className={classes.title} variant="h2">
        Company Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <InputForm 
            label="Company name" 
            value={company.name} 
            onChange={handleChangeName}
            onUpdate={handleUpdateName}
          />
        </Grid>
        <Grid item md={6}>
          <CompanyForm 
            label="Parent company" 
            placeholder="Assign parent company..."
            company={company.parent}
          />
        </Grid>
        <Grid item md={6}>
          <CompanyForm
            label="Broker"
            placeholder="Assign broker...."
            company={company.broker}
          />
        </Grid>
        <Grid item md={12}>
          <div className={classes.table}>
            <Typography className={classes.tableTitle} variant="h2">
              Utilization Snapshot
            </Typography>            
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>Product feature</TableCell>
                  <TableCell className={classes.tableHeadCell}>Current</TableCell>
                  <TableCell className={classes.tableHeadCell}>Max</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                <TableRow>
                  <StyledTableCell>Total users this month(2 days remain)</StyledTableCell>
                  <StyledTableCell>{company.totalUsers} users</StyledTableCell>
                  <StyledTableCell>{company.subscription ? company.subscription.maxUsers : 0} users</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Total storage used(GB)</StyledTableCell>
                  <StyledTableCell>{company.totalStorage} GB</StyledTableCell>
                  <StyledTableCell>{company.subscription ? company.subscription.maxStorage : 0} GB</StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Grid>
        <Grid item md={12}>
          <div className={classes.table}>
            <Typography className={classes.tableTitle} variant="h2">
              External File Sharing
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>
                    Allow your users in your company to use these features when sharing files externally
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <StyledTableCell>
                    <div className={classes.flex}>
                      <p>Automatic PDF</p>
                      <div className={classes.grow} />
                      <SwitchForm 
                        value={company.autoPdf} 
                        onChange={handleAutoPDF}
                      />
                    </div>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>
                    <div className={classes.flex}>
                      <p>Dynamic watermarking</p> 
                      <div className={classes.grow} />
                      <SwitchForm 
                        value={company.autoWatermark} 
                        onChange={handleAutoWatermark}
                      />
                    </div>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>
                    <div className={classes.flex}>
                      <p>Preview only</p>
                      <div className={classes.grow} />
                      <SwitchForm 
                        value={company.previewOnly}
                        onChange={handlePreviewOnly}
                      />
                    </div>
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Grid>
      </Grid>
    </Card>
  )
}