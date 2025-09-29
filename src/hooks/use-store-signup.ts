import { RegisterSchema } from "@/lib/validations/auth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type OnboardingState = Partial<RegisterSchema> & {
  setData: (data: Partial<RegisterSchema>) => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
    }),
    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);