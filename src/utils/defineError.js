export const defineError = (message = '') => {
    switch (message) {
        case 'NO_POSTS_WITH_THE_SELECTED_CATEGORY':
            return 'No posts with the selected category'

        case 'EMAIL_EXISTS':
            return 'Email already exists'

        case 'OPERATION_NOT_ALLOWED':
            return 'Operation not allowed'

        case 'EMAIL_NOT_FOUND':
            return 'Email not found'

        case 'INVALID_PASSWORD':
            return 'Invalid password'

        case 'auth/wrong-password':
            return 'Wrong password'

        case 'auth/user-not-found':
            return 'User not found'

        case 'auth/email-already-in-use':
            return 'Email already in use'
            
        case 'POST_DOESNT_EXIST':
            return 'The post doesn`t exist'
            
        case 'USER_DOESNT_EXIST':
            return 'The user doesn`t exist'
            
        case 'PlatformResourceAlreadyExists':
            return 'Resource already exists'
            
        case 'UnauthorizedError':
            return 'Unauthorized'
            
        case 'COMPLAINT_WAS_SENT':
            return 'You`ve already sent a complaint'
    
        default:
            return message
    }
}