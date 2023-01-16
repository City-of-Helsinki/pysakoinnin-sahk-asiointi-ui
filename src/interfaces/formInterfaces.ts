import { Control } from 'react-hook-form';
import { SearchState } from '../components/searchForm/searchFormSlice';

export type RectificationFormType = SearchState;

export type RectificationControlType = Control<RectificationFormType>;
