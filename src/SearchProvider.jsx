import { createContext, useState } from 'react'

export const SearchContext = createContext()

export default function SearchProvider({ children }) {
    const [search, setSearch] = useState('')

    const shareValue = {
        search,
        setSearch
    }

    return <SearchContext.Provider value={shareValue}>
        {children}
    </SearchContext.Provider>
}
