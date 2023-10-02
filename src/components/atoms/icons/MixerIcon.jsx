import React from "react"

const UserIcon = ({ style, fillColor = '#CBD5E1' }) => {
    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.79961 5.65715C8.16309 5.65715 7.55264 5.91 7.10255 6.36009C6.65247 6.81018 6.39961 7.42063 6.39961 8.05715C6.39961 8.69367 6.65247 9.30412 7.10255 9.7542C7.55264 10.2043 8.16309 10.4571 8.79961 10.4571C9.43613 10.4571 10.0466 10.2043 10.4967 9.7542C10.9468 9.30412 11.1996 8.69367 11.1996 8.05715C11.1996 7.42063 10.9468 6.81018 10.4967 6.36009C10.0466 5.91 9.43613 5.65715 8.79961 5.65715ZM4.79961 8.85715C4.82681 8.85715 4.85241 8.85715 4.87961 8.85395C5.06322 9.75818 5.55379 10.5711 6.2682 11.155C6.98261 11.739 7.87693 12.058 8.79961 12.058C9.72229 12.058 10.6166 11.739 11.331 11.155C12.0454 10.5711 12.536 9.75818 12.7196 8.85395C12.7462 8.85633 12.7729 8.8574 12.7996 8.85715H21.5996C21.8118 8.85715 22.0153 8.77286 22.1653 8.62283C22.3153 8.4728 22.3996 8.26932 22.3996 8.05715C22.3996 7.84497 22.3153 7.64149 22.1653 7.49146C22.0153 7.34143 21.8118 7.25715 21.5996 7.25715H12.7996C12.7724 7.25715 12.7468 7.25715 12.7196 7.26035C12.536 6.35611 12.0454 5.54317 11.331 4.95924C10.6166 4.37532 9.72229 4.05634 8.79961 4.05634C7.87693 4.05634 6.98261 4.37532 6.2682 4.95924C5.55379 5.54317 5.06322 6.35611 4.87961 7.26035C4.85301 7.25796 4.82631 7.2569 4.79961 7.25715H2.39961C2.18744 7.25715 1.98395 7.34143 1.83392 7.49146C1.68389 7.64149 1.59961 7.84497 1.59961 8.05715C1.59961 8.26932 1.68389 8.4728 1.83392 8.62283C1.98395 8.77286 2.18744 8.85715 2.39961 8.85715H4.79961ZM19.1196 18.4539C18.936 19.3582 18.4454 20.1711 17.731 20.755C17.0166 21.339 16.1223 21.658 15.1996 21.658C14.2769 21.658 13.3826 21.339 12.6682 20.755C11.9538 20.1711 11.4632 19.3582 11.2796 18.4539C11.253 18.4563 11.2263 18.4574 11.1996 18.4571H2.39961C2.18744 18.4571 1.98395 18.3729 1.83392 18.2228C1.68389 18.0728 1.59961 17.8693 1.59961 17.6571C1.59961 17.445 1.68389 17.2415 1.83392 17.0915C1.98395 16.9414 2.18744 16.8571 2.39961 16.8571H11.1996C11.2268 16.8571 11.2524 16.8571 11.2796 16.8603C11.4632 15.9561 11.9538 15.1432 12.6682 14.5592C13.3826 13.9753 14.2769 13.6563 15.1996 13.6563C16.1223 13.6563 17.0166 13.9753 17.731 14.5592C18.4454 15.1432 18.936 15.9561 19.1196 16.8603C19.1462 16.858 19.1729 16.8569 19.1996 16.8571H21.5996C21.8118 16.8571 22.0153 16.9414 22.1653 17.0915C22.3153 17.2415 22.3996 17.445 22.3996 17.6571C22.3996 17.8693 22.3153 18.0728 22.1653 18.2228C22.0153 18.3729 21.8118 18.4571 21.5996 18.4571H19.1996C19.1724 18.4571 19.1468 18.4571 19.1196 18.4539ZM12.7996 17.6571C12.7996 17.0206 13.0525 16.4102 13.5026 15.9601C13.9526 15.51 14.5631 15.2571 15.1996 15.2571C15.8361 15.2571 16.4466 15.51 16.8967 15.9601C17.3468 16.4102 17.5996 17.0206 17.5996 17.6571C17.5996 18.2937 17.3468 18.9041 16.8967 19.3542C16.4466 19.8043 15.8361 20.0571 15.1996 20.0571C14.5631 20.0571 13.9526 19.8043 13.5026 19.3542C13.0525 18.9041 12.7996 18.2937 12.7996 17.6571Z" fill={fillColor} />
        </svg>
    )
}

export default UserIcon