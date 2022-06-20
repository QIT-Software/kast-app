import {LoadableContainer} from 'state/entities/LoadableContainer';
import React from 'react';
import {ActivityIndicatorFill, ErrorPlaceholder} from 'components/index';
import {getErrorDetails, getErrorMessage} from 'utils/ErrorUtils';

interface RequireLoadableProps<TData> {
  data: LoadableContainer<TData>;
  emptyFallback?: () => React.ReactElement;
  loadingFallback?: () => React.ReactElement;
  failedFallback?: (error: Error, refresh?: () => void) => React.ReactElement;
  refresh?: () => void;
  children: (data: TData) => React.ReactElement;
}

function RequireLoadable<TData>({
  data,
  emptyFallback,
  failedFallback,
  refresh,
  loadingFallback,
  children,
}: RequireLoadableProps<TData>) {
  return (
    <>
      {data.isEmpty && !data.isLoading && (emptyFallback ? emptyFallback() : <></>)}
      {data.isFailed &&
        !data.isLoading &&
        (failedFallback ? (
          failedFallback(data.error, refresh)
        ) : (
          <ErrorPlaceholder
            message={getErrorMessage(data.error)}
            details={getErrorDetails(data.error)}
            refresh={refresh}
          />
        ))}
      {data.isSuccess && !data.isLoading && children(data)}
      {data.isLoading &&
        (loadingFallback ? loadingFallback() : <ActivityIndicatorFill />)}
    </>
  );
}

export default RequireLoadable;
