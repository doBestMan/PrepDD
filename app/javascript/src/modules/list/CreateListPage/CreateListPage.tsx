import React, {useState, useEffect, SyntheticEvent} from 'react';
import idx from 'idx';
import Snackbar from '@material-ui/core/Snackbar';

import Header from './components/Header';
import SelectTemplateStep from './components/SelectTemplateStep';
import CreateTemplateStep from './components/CreateTemplateStep';
import CreateListStep from './components/CreateListStep';

import {useAllTemplates} from '../../../graphql/queries/AllTemplates';
import {
  AllTemplates_templateLists,
  AllTemplates,
} from '../../../graphql/queries/__generated__/AllTemplates';

export default function CreateListPage() {
  const [step, setStep] = useState<number>(0);
  const [selectedTemplate, setSelectedTemplate] = useState<
    AllTemplates_templateLists
  >({
    __typename: 'List',
    id: '',
    name: '',
    tasks: [],
  });

  const {loading, data, error, fetchMore} = useAllTemplates({});

  useEffect(() => {
    if (!loading && step === 0) {
      loadMore();
    }
  }, [step]);

  useEffect(() => {
    const lists = idx(data, data => data.templateLists);

    if (loading || !lists) return;
  }, [loading, idx(data, data => data.templateLists)]);

  const loadMore = () => {
    fetchMore({
      variables: {},
      updateQuery: (
        previousResult: AllTemplates,
        options: {
          fetchMoreResult?: AllTemplates;
          variables?: {};
        }
      ) => {
        const fetchMoreResult = idx(
          options,
          options => options.fetchMoreResult
        );

        if (!fetchMoreResult) return previousResult;

        return {
          templateLists: [...fetchMoreResult.templateLists],
        };
      },
    });
  };

  return (
    data && (
      <div>
        <Header step={step} setStep={setStep} />

        <SelectTemplateStep
          data={data.templateLists}
          setSelectedTemplate={setSelectedTemplate}
          stepNumber={0}
          currentStep={step}
          setStep={setStep}
        />

        <CreateTemplateStep
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          stepNumber={1}
          currentStep={step}
          setStep={setStep}
        />

        <CreateListStep
          selectedTemplate={selectedTemplate}
          stepNumber={2}
          currentStep={step}
        />
      </div>
    )
  );
}
