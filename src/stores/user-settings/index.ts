import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { createSelectors } from "../createSelectors"
import { STORAGE_KEYS } from "@/constants/keys"
import type { StateCreator } from "zustand"

// =================
// Types
// =================
type UserSettingsState = {
  theme: "light" | "dark" | "system"
  isSidebarCollapse: boolean
}

type UserSettingsActions = {
  setter: (val: Partial<UserSettingsState>) => void
}

export type UserSettingsStore = UserSettingsState & UserSettingsActions

// =================
// Slice
// =================
const slice: StateCreator<UserSettingsStore> = (set) => ({
  // State
  theme: "system",
  isSidebarCollapse: false,

  // Actions
  setter: (val) => set(val),
})

// =================
// Store with Selectors
// =================
const useUserSettingsBase = create<UserSettingsStore>()(
  persist(immer(slice), {
    name: STORAGE_KEYS.USER_SETTINGS,
    version: 1,
  }),
)

export const useUserSettingsStore = createSelectors(useUserSettingsBase)
