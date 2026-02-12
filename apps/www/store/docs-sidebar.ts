import { create } from "zustand";

type DocsSidebarState = {
  open: boolean;
  toggle: () => void;
  openMenu: () => void;
  closeMenu: () => void;
};

export const useDocsSidebar = create<DocsSidebarState>((set) => ({
  open: false,
  toggle: () => set((s) => ({ open: !s.open })),
  openMenu: () => set({ open: true }),
  closeMenu: () => set({ open: false }),
}));
