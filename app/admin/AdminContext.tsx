'use client'

import { createContext, useContext } from 'react'

type AdminContextType = {
  fetchSignal: number
  role: string | null
}

const AdminContext = createContext<AdminContextType>({ fetchSignal: 0, role: null })

export const AdminProvider = AdminContext.Provider
export const useAdminContext = () => useContext(AdminContext)
