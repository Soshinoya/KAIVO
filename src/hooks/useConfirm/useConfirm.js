const useConfirm = (message = '', resolved, rejection) => {
    if (typeof resolved !== 'function' || typeof rejection !== 'function') return

    const confirmAction = () => window.confirm(message) ? resolved() : rejection()

    return confirmAction
}

export default useConfirm