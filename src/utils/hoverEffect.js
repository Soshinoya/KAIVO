export const hoverEffect = (buttonRef, spanRef) => {
    if (buttonRef?.current !== null && spanRef?.current !== null) {
        
        const onMouseHoverHandler = e => {
            const offset = {
                left: buttonRef.current.getBoundingClientRect().left,
                top: buttonRef.current.getBoundingClientRect().top
            };
            const relX = e.pageX - offset.left
            const relY = e.pageY - offset.top
            spanRef.current.style.left = relX + 'px';
            spanRef.current.style.top = relY + 'px';
        }

        buttonRef.current.addEventListener('mouseenter', onMouseHoverHandler)
        buttonRef.current.addEventListener('mouseout', onMouseHoverHandler)
    }
}