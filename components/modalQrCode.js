import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Button,
  DialogActions
} from '@mui/material'

const ModalQrCode = ({ title, subtitle, children, isOpen, handleClose }) => {
  const handleConfirm = () => {
    alert('You Agreed!')
    handleClose()
  }
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className='justify-center items-center w-full m-100'
    >
      <div class='modal-body'>
        <div class='container-fluid'>
          <div class='flex flex-row ...'>
            <div class='flex flex-row justify-start'>
              <div class='justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 '>
                <a
                  href='#'
                  class='w-full sm:w-auto bg-white-80 rounded-lg inline-flex items-center justify-center px-4 py-2.5'
                >
                  {/* logo momo */}
                  <img
                    src='https://firebasestorage.googleapis.com/v0/b/psychologicalcounseling-28efa.appspot.com/o/Desposit%2Flogo-momo-png-2.png?alt=media&token=53a3ea95-c76b-4943-a0ae-34403acc617f'
                    alt='logo momo'
                    class='w-10 h-10'
                  />
                  <span class='ml-2'>Momo</span>
                </a>
              </div>
              <div class='justify-center ml-38 mr-40'>
                <div class='flex flex-row justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 ' />
              </div>
              <div class='ml-10 mt-5'>
                <h3 class=' justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 '>
                  Đơn hàng hết hạn sau 10 phút
                </h3>
                <h3 class=' justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 bg-pink-700 text-white border-r-2'>
                  10:00
                </h3>
              </div>
            </div>
          </div>
          <div class='flex flex-col mt-10'>
            <div class='flex flex-col justify-between items-center text-pink-600 text-4xl
            '>
              Quét mã để thanh toán
            </div>
          </div>
          <div class='row'>
            <div class='flex flex-col justify-between items-center text-pink-600 2xl:text-4xl mt-2
             '>
              200.000
            </div>
            {/* <div class='flex flex-col justify-between items-center text-pink-600'>
              <h3 className='first-line:text-black'>Tài khoản nhận:</h3>
              <h3 className='second-line:text-black'>0394705508</h3>
            </div>
            <div class='flex flex-col justify-between items-center text-pink-600'>
              <h3 className='first-line:text-black'>Tên người nhận:</h3>
              <h3 className='second-line:text-black'>Vũ Anh Tuấn</h3>
            </div> */}
          </div>
          <div class='row'>
            <div class='mt-10 mr-10 ml-10 justify-between items-center text-pink-600 text-2xl'>
              <img
                src='https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png'
                class='rounded mx-auto d-block'
                alt='...'
              />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default ModalQrCode
