export const blurBackground = (isActive = false) => {
    const body = document.querySelector('body')
    const blurElem = document.querySelector('.blur-bg')
    if (isActive) {
        body.style.overflow = 'hidden'
        blurElem.classList.add('blur-bg--active')
    } else {
        body.style.overflow = 'auto'
        blurElem.classList.remove('blur-bg--active')
    }
}