import { useDispatch } from 'react-redux';
import { setSearchParams } from '../(state)/search-slice';

export const usePagination = () => {
  const dispatch = useDispatch();

  const handlePageChange = (pageIndex: number) => {
    dispatch(setSearchParams({ pageIndex : pageIndex }));
  };

  const handlePageRowChange = (pageSize: number) => {
    dispatch(setSearchParams({ pageSize: pageSize }));
  };

  return {
    handlePageChange,
    handlePageRowChange,
  };
};