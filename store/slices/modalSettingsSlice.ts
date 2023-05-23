// @ts-nocheck

import { StateCreator , create} from "zustand";


export const useSettingsModal = create((set) => ( {
    isSettingsModalVisible : false,
    toggleSettingsModal : () => set((state) => ({isSettingsModalVisible : !state.isSettingsModalVisible}))
}))

export const useNotificationsModal = create((set) => ( {
    isNotificationModalVisible: false,
    toggleNotificationsModal : () => set((state) => ({isNotificationModalVisible : !state.isNotificationModalVisible}))
}))

export const useEnergyModal = create((set) => ( {
    isEnergyModalVisible: false,
    toggleIsEnergyModalVisible : () => set((state) => ({isEnergyModalVisible : !state.isEnergyModalVisible}))
}))