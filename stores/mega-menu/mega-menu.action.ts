import { BaseAction } from ".."
import { State } from "./index"

type Actions = BaseAction<State>

export const openMegaMenu = () =>
  async ({ setState, getState }: Actions) => {
      setState({
          ...getState(),
          isMegaMenuOpen: true
      })
  }

export const closeMegaMenu = () =>
  async ({ setState, getState }: Actions) => {
      setState({
          ...getState(),
          isMegaMenuOpen: false
      })
  }

export const openCollaboratorsMegaMenu = () =>
  async ({ setState, getState }: Actions) => {
      setState({
          ...getState(),
          isMegaCollaboratorsMenuOpen: true
      })
  }

export const closeCollaboratorsMegaMenu = () =>
  async ({ setState, getState }: Actions) => {
      setState({
          ...getState(),
          isMegaCollaboratorsMenuOpen: false
      })
  }