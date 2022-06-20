import {LoadableContainer} from 'state/entities/LoadableContainer';
import React from 'react';
import {ActivityIndicatorFill, ErrorPlaceholder} from 'components/index';
import {getErrorDetails, getErrorMessage} from 'utils/ErrorUtils';

interface LoadableWrapperProps<TData> {
  data: LoadableContainer<TData>;
  refresh?: () => void;
  children: (data: TData | null) => React.ReactElement;
}

function LoadableWrapper<TData>({data, refresh, children}: LoadableWrapperProps<TData>) {
  return (
    <>
      {!data.isFailed && children(data.isSuccess ? data : null)}
      {data.isFailed && (
        <ErrorPlaceholder
          message={getErrorMessage(data.error)}
          details={getErrorDetails(data.error)}
          refresh={refresh}
        />
      )}
      {data.isLoading && <ActivityIndicatorFill />}
    </>
  );
}

export default LoadableWrapper;
