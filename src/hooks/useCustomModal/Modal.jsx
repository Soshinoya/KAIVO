import React, { useRef } from "react"

import { blurBackground } from '../../utils/blurBackground'

let globalModalInDOM = null

const ANIMATION_SPEED = 500

function modalClose() {
    blurBackground(false)
    globalModalInDOM.current.classList.remove('open')
    globalModalInDOM.current.classList.add('hide')
    setTimeout(() => {
        globalModalInDOM.current.classList.remove('hide')
    }, ANIMATION_SPEED)
}

function listener(event, afterClick) {
    if (!event.target.closest('.vmodal').classList.contains('open')) {
        return
    }
    if (event.target.dataset['overlayClose'] || event.target.closest('[data-button-close]')?.dataset['buttonClose'] || afterClick === 'close') {
        modalClose()
    }
    if (typeof afterClick === 'function') {
        afterClick()
    }
}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return
    }


    const wrap = (
        <div className="modal-footer">
            {buttons.map((btn, index) => {
                return <button className={`btn btn-${btn.type || 'secondary'}`} onClick={e => listener(e, btn.afterClick)} key={index}>{btn.text}</button>
            })}
        </div>
    )

    return wrap
}

const Modal = ({ content, footerButtons, setIsModalOpen = () => {} }) => {

    const modalInDOM = useRef()
    globalModalInDOM = modalInDOM

    const footer = _createModalFooter(footerButtons)

    return {
        modalJSX: (
            <div className='vmodal' ref={modalInDOM} onClick={listener}>
                <div className='modal-overlay' data-overlay-close="true" onClick={e => setIsModalOpen(e, false)}>
                    <div className='panel modal-window'>
                        <div className='modal-body' data-content>
                            {content || ''}
                        </div>
                        {footer}
                    </div>
                </div>
            </div>
        ),
        modalInDOM,
        modalClose
    }

}

export default Modal