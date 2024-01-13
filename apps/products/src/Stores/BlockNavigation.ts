import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { create } from "zustand";
interface BlockNavigationState {
  isBlocked: boolean;
  setIsBlocked: (val: boolean) => void;
}

const blockNavigationStoreBase = create<BlockNavigationState>((set) => ({
  isBlocked: false,
  setIsBlocked: (val) => set({ isBlocked: val }),
}));

export const useBlockNavigationStore = createSelectorHooks(
  blockNavigationStoreBase
);
