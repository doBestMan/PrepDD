import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import idx from 'idx';
import {Theme, makeStyles, createStyles} from '@material-ui/core/styles';
import {
  Grid,
  Typography, 
  FormControl,
  FormControlLabel,
  RadioGroup, 
  Radio, 
  Button,
} from '@material-ui/core';

import InternalIcon from '@material-ui/icons/Lock';
import ShareIcon from '@material-ui/icons/People';
import RequestIcon from '@material-ui/icons/Input';

import {canBeAdmin} from '../../../../../helpers/roleHelpers';
import {useGlobalState} from '../../../../../store';
import InputForm from './components/InputForm';
import OwnerForm from './components/OwnerForm';
import CompanyForm from './components/CompanyForm';
import StyledItem from './components/StyledItem';
import Alert from './components/Alert';

import {
  AllTemplates_templateLists,
  AllTemplates_templateLists_tasks,
} from '../../../../../graphql/queries/__generated__/AllTemplates';
import {SearchCompanyUsers_searchCompanyUsers} from './components/__generated__/SearchCompanyUsers';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {},
    body: {
      height: 'calc(100vh - 156px)',
      padding: '0px calc((100% - 1080px) / 2) 0px calc((100% - 1080px) / 2)', 
      borderBottom: '1px solid #D8D8D8',
      overflow: 'auto', 
    }, 
    footer: {
      height: '72px', 
      padding: '0px calc((100% - 1080px) / 2) 0px calc((100% - 1080px) / 2)', 
      },
      flex: {
        display: 'flex', 
        alignItems: 'center', 
      },
    grow: {
      flexGrow: 1, 
    },
    secondary: {
      color: '#606060', 
      marginTop: '24px', 
      marginBottom: '12px', 
    },
    sharingTitle: {
      color: '#606060', 
      marginLeft: '3px', 
    },
    icon: {
      fontSize: '15px', 
      marginRight: '12px', 
    },
    explanation: {
      color: '#606060', 
      marginLeft: '32px', 
    },
    grayRect: {
      width: '36px', 
      height: '36px', 
      backgroundColor: '#F2F2F2',
      border: '1px solid #D8D8D8',
      borderRadius: '3px',
      marginRight: '12px', 
    },
    description: {
      width: '100%', 
      height: '180px', 
      borderRadius: '3px',
      resize: 'none', 
      border: '1px solid #D8D8D8',
    },
  })
);

interface CreateListStepProps {
  selectedTemplate: AllTemplates_templateLists;
  stepNumber: number;
  currentStep: number;
};

interface ListType {
  name: string;
  description: string;
  requesterId: string;
  responderId: string;
  isTemplate: boolean;
  isPublicTemplate: boolean;
}

export default function CreateListStep(props: CreateListStepProps) {
  const {
    selectedTemplate, 
    stepNumber, 
    currentStep
  } = props;
  const classes = useStyles();
  const {state} = useGlobalState();
  const [newTemplate, setNewTemplate] = useState<ListType>({
    name: '',
    description: '',
    requesterId: state.selectedCompany,
    responderId: '',
    isTemplate: false, 
    isPublicTemplate: false,
  });
  const [sharing, setSharing] = useState<string>("internal");
  const [owners, setOwners] = useState<SearchCompanyUsers_searchCompanyUsers[]>([]);

  const role = () => {
    if (state && state.currentUser && state.currentUser.roles) {
      const findRole = state.currentUser.roles.find(role => role.companyId === state.selectedCompany);

      return findRole ? findRole.name : 'User';
    }
    return 'User';
  };

  const InternalLabel = (
    <Typography variant="h6" className={classes.flex}>
      <InternalIcon className={classes.icon} />
      Internal
    </Typography>
  )
  const ShareLabel = (
    <Typography variant="h6" className={classes.flex}>
      <ShareIcon className={classes.icon} />
      Share
    </Typography>
  )
  const RequestLabel = (
    <Typography variant="h6" className={classes.flex}>
      <RequestIcon className={classes.icon} />
      Request
    </Typography>
  )

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTemplate({
      ...newTemplate, 
      name: event.target.value, 
    })
  }

  const handleChangeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTemplate({
      ...newTemplate, 
      description: event.target.value, 
    })
  }

  const handleChangeSharing = (event: React.ChangeEvent<{}>, value: string) => {
    setSharing(value);

    if (value === 'internal' || value === 'issue') {
      setNewTemplate({
        ...newTemplate, 
        requesterId: state.selectedCompany, 
        responderId: ''
      })
    } else if (value === 'share') {
      setNewTemplate({
        ...newTemplate, 
        requesterId: '', 
        responderId: state.selectedCompany
      })      
    }
  }

  return stepNumber == currentStep ? (
    <div>
      <div className={classes.body}>
        <Grid container spacing={6}>
          <Grid item md={6}>
            <Typography variant="h2">Create List</Typography>
            <FormControl component="fieldset" style={{marginTop: '48px'}}>
              <Typography variant="h6" className={classes.sharingTitle}>
                Sharing
              </Typography>
              <RadioGroup
                aria-label="sharing"
                name="sharing"
                value={sharing}
                onChange={handleChangeSharing}
              >
                <FormControlLabel 
                  value="internal" 
                  label={InternalLabel} 
                  control={<Radio color="primary" />} 
                />
                <Typography variant="h6" className={classes.explanation}>
                  Collaborate within your company. Use this setting when sharing information with your colleagues
                </Typography>
                {canBeAdmin(role()) && (
                  <>
                    <FormControlLabel 
                      value="share" 
                      label={ShareLabel} 
                      control={<Radio color="primary" />} 
                    />
                    <Typography variant="h6" className={classes.explanation}>
                      Send information to an external company. Use this setting when your company has the primary responsibility for providing the information in the task list.
                    </Typography>
                    <FormControlLabel 
                      value="issue" 
                      label={RequestLabel} 
                      control={<Radio color="primary"/>} 
                    />
                    <Typography variant="h6" className={classes.explanation}>
                      Issue a request for information from an external company. Use this setting when the other company is responsible for providing most of the information in the task list.
                    </Typography>
                  </>
                )}
              </RadioGroup>
            </FormControl>
            {canBeAdmin(role()) && (
              <Alert />
            )}
          </Grid>
          <Grid item md={6}>
            <Typography variant="h2">Sharing to List Type</Typography>

            <InputForm label="Title" value={newTemplate.name as string} onChange={handleChangeName} />

            <div>
              <Typography variant="h6" className={classes.secondary}>Template</Typography>
              <div className={classes.flex}>
                <div className={classes.grayRect} />
                <Typography variant="h6">{selectedTemplate.name}</Typography>
              </div>
            </div>

            <OwnerForm 
              owners={owners}
              setOwners={setOwners}
            />
            <CompanyForm
            />
            {sharing !== 'internal' && (
              <div>
                <Typography variant="h6" className={classes.secondary}>Issue to</Typography>
                <div className={classes.flex}>
                  <StyledItem label="G2 Crowd" />
                </div>
              </div>
            )}


            <div>
              <Typography variant="h6" className={classes.secondary}>Description</Typography>
              <textarea 
                className={classes.description} 
                value={newTemplate.description}
                onChange={handleChangeDescription}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      
      <div className={classes.footer}>
        <div className={classes.flex} style={{paddingTop: '18px'}}>
          <div className={classes.grow} />
          <Button variant="contained">
            Create List
          </Button>
        </div>
      </div>
    </div>
  ): null;
};