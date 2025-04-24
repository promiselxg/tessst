import { create } from "zustand";

const useConfettiStore = create((set) => ({
  isConfettiVisible: false,
  showConfetti: () => set({ isConfettiVisible: true }),
  hideConfetti: () => set({ isConfettiVisible: false }),
}));
export default useConfettiStore;
