import Modal from './Modal'

import { blurBackground } from '../../utils/blurBackground'

const useCustomModal = options => {

    const {modalInDOM, modalJSX, modalClose} = Modal({ ...options })

    const modal = {
        modalJSX,
        modalOpen() {
            blurBackground(true)
            modalInDOM.current.classList.add('open')
        },
        modalClose
    }

    return modal
}

export default useCustomModal