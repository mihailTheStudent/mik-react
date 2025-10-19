import { useLocation } from 'react-router-dom';

type SafeLocation<State> = Location & {
  state: State;
};

export const useSafeLocation = <State>(): SafeLocation<State> =>
  useLocation() as unknown as SafeLocation<State>;
