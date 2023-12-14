import { State } from './index'
export const selector = (state: State) => {
  return {
    isOpen: state.isOpen
  };
};
