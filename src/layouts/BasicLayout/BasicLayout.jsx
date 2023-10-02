import React, { useState } from "react"
import { Outlet } from "react-router-dom"

import { getRandomUUID } from "../../utils/getRandomUUID"

import Header from '../../components/organisms/Header/Header.jsx'
import LeftSidebar from '../LeftSidebar/LeftSidebar'
import RightSidebar from '../RightSidebar/RightSidebar'
import ResultsBlock from "../../components/molecules/ResultsBlock/ResultsBlock"

import { ScrollToTop } from '../../utils/scrollToTop'

import BasicTemplate from '../../components/templates/BasicTemplate/BasicTemplate.jsx'

const BasicLayout = () => {

    ScrollToTop()

    const [tagsData, setTagsData] = useState([
        {
            text: '#porsche 911',
            id: getRandomUUID()
        },
        {
            text: '#BMW',
            id: getRandomUUID()
        },
        {
            text: '#photo',
            id: getRandomUUID()
        },
        {
            text: '#livery',
            id: getRandomUUID()
        },
        {
            text: '#blueprint',
            id: getRandomUUID()
        },
        {
            text: '#BMW',
            id: getRandomUUID()
        },
        {
            text: '#tuning',
            id: getRandomUUID()
        },
        {
            text: '#red',
            id: getRandomUUID()
        }
    ])

    const [searchResults, setSearchResults] = useState([])

    return (
        <BasicTemplate header={<Header setSearchResults={setSearchResults} />} leftSidebar={<LeftSidebar />} rightSidebar={<RightSidebar tagsData={tagsData} setTagsData={setTagsData} />}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {searchResults.length > 0 && <ResultsBlock results={searchResults} />}
                <Outlet />
            </div>
        </BasicTemplate>
    )
}

export default BasicLayout