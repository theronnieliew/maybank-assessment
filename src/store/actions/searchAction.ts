import {Dispatch} from 'redux';
import {
  searchStart,
  searchSuccess,
  searchFailure,
} from '../reducers/searchReducer';

export const search = (searchTerm: string) => async (dispatch: Dispatch) => {
  dispatch(searchStart());
  try {
    const results = searchTerm;
    dispatch(searchSuccess(results));
  } catch (error: any) {
    dispatch(searchFailure(error.message));
  }
};
