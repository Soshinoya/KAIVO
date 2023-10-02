import React, { useState, useRef } from 'react'

import MoreActionsIcon from './icons/MoreActionsIcon'

const ActionMenu = ({ actions }) => {

    const selectRef = useRef(null)

    const [isOpen, setIsOpen] = useState(false)

    const handleOptionClick = cb => {
        setIsOpen(false)
        cb()
    }

    const toggleSelect = () => setIsOpen(!isOpen)

    const handleOutsideClick = ({ target }) => {
        if (selectRef.current && !selectRef.current.contains(target)) {
            setIsOpen(false)
        }
    }

    // Добавляем обработчик клика вне селектора для закрытия при щелчке вне компонента
    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick)

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    return (
        <div className="action-menu__wrapper body-small">
            <div className="action-menu" ref={selectRef} onClick={toggleSelect}>
                <MoreActionsIcon style={{ width: '25px', height: '5px' }} />
            </div>
            {isOpen && (
                <div className="action-menu__options">
                    {actions?.map(({ title, action, id }) => (
                        <p
                            className="action-menu__option"
                            onClick={() => handleOptionClick(action)}
                            key={id}
                        >
                            {title}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ActionMenu