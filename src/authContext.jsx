import { useState } from 'react'
import { AuthContext, getStoredUserId } from './auth'

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(getStoredUserId)

    const value = {
        currentUser, setCurrentUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

