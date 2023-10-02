import React from "react"

const UserIcon = ({ style, strokeColor = '#CBD5E1' }) => {
    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
            <path d="M12.4286 23.8571C18.7404 23.8571 23.8571 18.7404 23.8571 12.4286C23.8571 6.11675 18.7404 1 12.4286 1C6.11675 1 1 6.11675 1 12.4286C1 18.7404 6.11675 23.8571 12.4286 23.8571Z" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21.0003 19.5714C20.0546 16.3229 16.4288 15.25 12.4288 15.25C8.53314 15.25 4.90028 16.4914 3.85742 19.5714" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path fillRule="evenodd" clipRule="evenodd" d="M12.4283 3.85715C13.5649 3.85715 14.655 4.30868 15.4588 5.1124C16.2625 5.91613 16.714 7.00622 16.714 8.14286V11C16.714 12.1366 16.2625 13.2267 15.4588 14.0305C14.655 14.8342 13.5649 15.2857 12.4283 15.2857C11.2917 15.2857 10.2016 14.8342 9.39783 14.0305C8.59411 13.2267 8.14258 12.1366 8.14258 11V8.14286C8.14258 7.00622 8.59411 5.91613 9.39783 5.1124C10.2016 4.30868 11.2917 3.85715 12.4283 3.85715Z" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default UserIcon