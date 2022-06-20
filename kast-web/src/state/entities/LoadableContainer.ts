type EmptyBase = {
  isEmpty: true;
  isSuccess: false;
  isFailed: false;
};

type SuccessBase<TData> = {
  isEmpty: false;
  isSuccess: true;
  isFailed: false;
} & TData;

type FailedBase = {
  isEmpty: false;
  isSuccess: false;
  isFailed: true;
  error: Error;
};

type NotLoading = {
  isLoading: false;
};

type Empty = EmptyBase & NotLoading;

type Success<TData> = SuccessBase<TData> & NotLoading;

type Failed = FailedBase & NotLoading;

type Loading<TData> = (EmptyBase | SuccessBase<TData> | FailedBase) & {
  isLoading: true;
};

export type LoadableContainer<TData> = Empty | Loading<TData> | Success<TData> | Failed;

export const empty = <TData>(): LoadableContainer<TData> => ({
  isEmpty: true,
  isSuccess: false,
  isFailed: false,
  isLoading: false,
});

export const loading = <TData>(
  state: LoadableContainer<TData>,
): LoadableContainer<TData> => ({
  ...state,
  isLoading: true,
});

export const success = <TData>(data: TData): LoadableContainer<TData> => ({
  isEmpty: false,
  isSuccess: true,
  isFailed: false,
  isLoading: false,
  ...data,
});

export const failed = <TData>(error: any): LoadableContainer<TData> => ({
  isEmpty: false,
  isSuccess: false,
  isFailed: true,
  isLoading: false,
  error,
});

export const extractArraySafely = <TItem>(
  container: LoadableContainer<{items: TItem[]}>,
) => (!container.isEmpty && !container.isFailed ? container.items : null);

export const modify = <TData>(
  container: LoadableContainer<TData>,
  ifSuccess: (data: TData) => TData,
) => (container.isSuccess ? success(ifSuccess(container)) : container);
