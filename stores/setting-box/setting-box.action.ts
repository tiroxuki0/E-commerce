import { BaseAction } from ".."
import { State } from "./index"

type Actions = BaseAction<State>

export const toggleSettingBox = (isOpen: boolean) =>
  async ({ setState, getState }: Actions) => {
      setState({
          ...getState(),
          isOpen: isOpen
      })
  }