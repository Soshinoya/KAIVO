import { useState } from "react"

const useTabs = (initialTab, allTabs) => {
    const [currentIndex, setCurrentIndex] = useState(initialTab)

    if (!allTabs || !Array.isArray(allTabs)) return // Проверка на массив

    return {
        currentTab: allTabs[currentIndex],
        changeCurrentTab: setCurrentIndex
    }
}

export default useTabs