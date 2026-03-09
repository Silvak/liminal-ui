import { create } from "zustand";
import { THEME_PRESETS, type ThemePreset, type ThemeVars } from "../components/playground/theme-presets";

export type PlaygroundLayout = "dashboard" | "cards";
export type PlaygroundMode = "light" | "dark";

type PlaygroundState = {
  activeLayout: PlaygroundLayout;
  activePreset: string;
  themeVars: ThemeVars;
  radius: number;
  mode: PlaygroundMode;
  setActiveLayout: (layout: PlaygroundLayout) => void;
  setPreset: (presetName: string) => void;
  setThemeVar: (key: keyof ThemeVars, value: string) => void;
  setRadius: (r: number) => void;
  setMode: (m: PlaygroundMode) => void;
  resetToPreset: () => void;
};

function getPresetVars(preset: ThemePreset, mode: PlaygroundMode): ThemeVars {
  return mode === "dark" ? preset.dark : preset.light;
}

const defaultPreset = THEME_PRESETS[0];

export const usePlaygroundStore = create<PlaygroundState>((set, get) => ({
  activeLayout: "dashboard",
  activePreset: defaultPreset.name,
  themeVars: getPresetVars(defaultPreset, "light"),
  radius: 0,
  mode: "light",

  setActiveLayout: (layout) => set({ activeLayout: layout }),

  setPreset: (presetName) => {
    const preset = THEME_PRESETS.find((p) => p.name === presetName);
    if (!preset) return;
    const { mode } = get();
    set({
      activePreset: presetName,
      themeVars: getPresetVars(preset, mode),
      radius: preset.radius,
    });
  },

  setThemeVar: (key, value) =>
    set((state) => ({
      themeVars: { ...state.themeVars, [key]: value } as ThemeVars,
    })),

  setRadius: (r) => set({ radius: r }),

  setMode: (m) => {
    const { activePreset } = get();
    const preset = THEME_PRESETS.find((p) => p.name === activePreset);
    if (preset) {
      set({ mode: m, themeVars: getPresetVars(preset, m) });
    } else {
      set({ mode: m });
    }
  },

  resetToPreset: () => {
    const { activePreset, mode } = get();
    const preset = THEME_PRESETS.find((p) => p.name === activePreset);
    if (!preset) return;
    set({
      themeVars: getPresetVars(preset, mode),
      radius: preset.radius,
    });
  },
}));
