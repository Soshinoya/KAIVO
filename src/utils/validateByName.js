const errorMessages = [
    {
        name: 'nickname',
        error: 'The nickname must be up to 30 characters long'
    },
    {
        name: 'name',
        error: 'The name must be up to 30 characters long'
    },
    {
        name: 'surname',
        error: 'The surname must be up to 30 characters long'
    },
    {
        name: 'email',
        error: 'Email is not specified correctly'
    },
    {
        name: 'password',
        error: 'The password must be between 8 and 16 characters long'
    },
    {
        name: 'repeatPassword',
        error: 'The passwords must match'
    },
    {
        name: 'text',
        error: 'The text must be up to 256 characters long'
    },
    {
        name: 'title',
        error: 'The title must be up to 50 characters long'
    },
    {
        name: 'description',
        error: 'The description must be between 30 and 256 characters long'
    },
    {
        name: 'number',
        error: 'The number must be up to 1000 characters long'
    },
    {
        name: 'status',
        error: 'The status must be up to 30 characters long'
    },
    {
        name: 'secondaryText',
        error: 'The secondaryText must be up to 30 characters long'
    },
    {
        name: 'tags',
        error: 'Incorrect tags are specified or the allowed number of characters is exceeded'
    },
    {
        name: 'default',
        error: 'Name is not suited. Check available cases of name at validateByName.js'
    }
]

export const validateByName = (name = '', text = '', additionalValues) => {

    const output = {
        boo: false,
        message: ''
    }

    const reg = new RegExp('@')

    const trimmedValue = text.trim()

    switch (name) {
        case 'nickname':
            if (!!trimmedValue && trimmedValue.length <= 30) {
                output.boo = true
            } else {
                output.message = errorMessages.find(o => o.name === 'nickname').error
            }
            break
        case 'name':
            if (!!trimmedValue && trimmedValue.length <= 30) {
                output.boo = true
            } else {
                output.message = errorMessages.find(o => o.name === 'name').error
            }
            break
        case 'surname':
            if (!!trimmedValue && trimmedValue.length <= 30) {
                output.boo = true
            } else {
                output.message = errorMessages.find(o => o.name === 'surname').error
            }
            break
        case 'email':
            if (!!trimmedValue && !!reg.test(text)) {
                output.boo = true
            } else {
                output.message = errorMessages.find(o => o.name === 'email').error
            }
            break
        case 'password':
            if (!!trimmedValue && trimmedValue.length >= 8 && trimmedValue.length <= 16) {
                output.boo = true
            } else {
                output.message = errorMessages.find(o => o.name === 'password').error
            }
            break
        case 'repeatPassword':
            if (!!trimmedValue && trimmedValue === additionalValues?.passwordValue.trim()) {
                output.boo = true
            } else {
                output.message = errorMessages.find(o => o.name === 'repeatPassword').error
            }
            break
        case 'text':
            if (!!trimmedValue && trimmedValue.length < 256) {
                output.boo = true
            } else {
                output.message = errorMessages.find(o => o.name === 'text').error
            }
            break
        case 'title':
            if (!!trimmedValue && trimmedValue.length < 50) {
                output.boo = true
            } else {
                output.message = errorMessages.find(o => o.name === 'title').error
            }
            break
        case 'description':
            if (!!trimmedValue && trimmedValue.length >= 30 && trimmedValue.length < 256) {
                output.boo = true
            } else {
                output.message = errorMessages.find(o => o.name === 'description').error
            }
            break
        case 'number':
            if (!!trimmedValue && trimmedValue <= 1000 && trimmedValue > 0 && trimmedValue.length <= 4) {
                output.boo = true
            } else {
                output.message = errorMessages.find(o => o.name === 'number').error
            }
            break
        case 'status':
            if (!!trimmedValue && trimmedValue.length <= 30) {
                output.boo = true
            } else {
                output.message = errorMessages.find(o => o.name === 'status').error
            }
            break
        case 'secondaryText':
            if (!!trimmedValue && trimmedValue.length <= 30) {
                output.boo = true
            } else {
                output.message = errorMessages.find(o => o.name === 'secondaryText').error
            }
            break
        case 'tags':
            if (!!trimmedValue && trimmedValue.length <= 30) {
                output.boo = true
            } else {
                output.message = errorMessages.find(o => o.name === 'tags').error
            }
            const tagsArr = trimmedValue.split(' ')
            tagsArr.forEach(tag => {
                if (tag[0] !== '#') {
                    output.boo = false
                    output.message = errorMessages.find(o => o.name === 'tags').error
                }
            })
            break
        default:
            output.message = errorMessages.find(o => o.name === 'default').error
            break
    }
    return output
}