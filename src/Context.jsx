import { createContext, useState, useEffect } from 'react'

export const Context = createContext()

export function ContextProvider(props) {

    useEffect(() => {

    }, [])


    return (
        <Context.Provider value={{
        }}>
            {props.children}
        </Context.Provider>
    )
}