import { BaseAction } from ".."
import { State } from "./index"

type Actions = BaseAction<State>

export const toggleCartBox = (payload: boolean) =>
  async ({ setState, getState }: Actions) => {
      setState({
          ...getState(),
          cartBoxIsVisible: payload
      })
  }