import React from 'react';
import SearchForm from '../searchForm/SearchForm';

interface Props {
  activeStep: number;
}

const FormContent = (props: Props): React.ReactElement => (
  <div>{props.activeStep === 0 && <SearchForm />}</div>
);

export default FormContent;
