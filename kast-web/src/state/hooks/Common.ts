export type EqualityFn<TSelected> = (left: TSelected, right: TSelected) => boolean;

export type UseSelectorFunction<TState> = <TSelected>(
  selector: (state: TState) => TSelected,
  equalityFn?: EqualityFn<TSelected>,
) => TSelected;
