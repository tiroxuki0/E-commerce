import { State } from './index'
export const selector = (state: State) => {
  return {
    isMegaMenuOpen: state.isMegaMenuOpen,
    isMegaCollaboratorsMenuOpen: state.isMegaCollaboratorsMenuOpen
  }
}
