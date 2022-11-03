import React from 'react';
import SearchForm from '../searchForm/SearchForm';

interface Props {
  selectedForm: string;
  activeStep: number;
}

const FormContent = (props: Props): React.ReactElement => (
  <div>
    {props.selectedForm === 'parkingFine' && props.activeStep === 0 && (
      <SearchForm />
    )}
  </div>
);

export default FormContent;
