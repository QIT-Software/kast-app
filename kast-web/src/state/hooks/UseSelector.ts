import {useSelector as reduxUseSelector} from 'react-redux';
import {UseSelectorFunction} from './Common';
import State from '../entities/State';

export const useSelector: UseSelectorFunction<State> = reduxUseSelector;
