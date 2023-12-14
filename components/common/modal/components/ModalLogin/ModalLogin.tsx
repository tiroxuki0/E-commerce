import Modal from 'components/common/modal'
import Login from './components/Login'

const ModalLogin = (props: any) => {
  const handleCloseModal = () => {
    props?.close()
  }

  return (
    <Modal status={props?.status} fullWidthOnPhone close={props.close}>
      <Login
        status={props?.status}
        handleCloseModal={handleCloseModal}
      />
    </Modal>
  )
}
export default ModalLogin
