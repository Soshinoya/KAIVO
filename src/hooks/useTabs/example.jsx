import useTabs from './useTabs'

const content = [
    {
        tab: 'Раздел 1',
        content: 'Здесь передаётся контент для раздела 1'
    },
    {
        tab: 'Раздел 2',
        content: 'Здесь передаётся контент для раздела 2'
    },
    {
        tab: 'Раздел 3',
        content: 'Здесь передаётся контент для раздела 3'
    }
]

function useTabsExample() {
    const { currentTab, changeCurrentTab } = useTabs(0, content)

    return (
        <div className="useTabsExample">
            <h1>This is useTabs custom hook</h1>
            {content.map((section, index) => (
                <button onClick={() => changeCurrentTab(index)} key={section.id}>{section.tab}</button>
            ))}
            <div>
                {currentTab.content}
            </div>
        </div>
    )
}

export default useTabsExample