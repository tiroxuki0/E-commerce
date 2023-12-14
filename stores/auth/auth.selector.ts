import { State } from './index'
export const selector = (state: State) => {
  return {
    isModalLogin: state.isModalLogin,
    isLogin: state.isLogin,
    isRegister: state.isRegister,
    userData: state.userData,
  }
}
