import React from "react"

import Tag from "../atoms/Tag"

const Tags = ({ tagsData, setTagsData, action = 'remove' }) => {

    const onClickHandler = ({ id, text }) => {
        switch (action) {
            case 'remove':
                setTagsData([...tagsData.filter(tag => tag.id !== id)])
                break;
            case 'search':
                const searchInput = document.querySelector('input[name="search"')
                searchInput.value = text
                searchInput.focus()
                window.scrollTo(0, 0)
                break;
        }
    }

    return (
        <div className="tags">
            <ul className="tags__list">
                {tagsData.map(({ text, id }) => (
                    <li key={id}>
                        <Tag text={text} key={id} onClick={() => onClickHandler({ id, text })} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Tags