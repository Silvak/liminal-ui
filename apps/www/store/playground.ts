import { create } from "zustand";
import {
  THEME_PRESETS,
  type ThemePreset,
  type ThemeVars,
  type ShadowConfig,
} from "../components/playground/theme-presets";

export type PlaygroundLayout = "dashboard" | "cards";
export type PlaygroundMode = "light" | "dark";
export type PlaygroundToolTab = "colors" | "typography" | "other";

type PlaygroundState = {
  activeLayout: PlaygroundLayout;
  activePreset: string;
  themeVars: ThemeVars;
  radius: number;
  spacing: number;
  letterSpacing: number;
  shadow: ShadowConfig;
  fontSans: string;
  fontSerif: string;
  fontMono: string;
  mode: PlaygroundMode;
  activeToolTab: PlaygroundToolTab;

  setActiveLayout: (layout: PlaygroundLayout) => void;
  setPreset: (presetName: string) => void;
  setThemeVar: (key: keyof ThemeVars, value: string) => void;
  setRadius: (r: number) => void;
  setSpacing: (s: number) => void;
  setLetterSpacing: (ls: number) => void;
  setShadowProp: (key: keyof ShadowConfig, value: number | string) => void;
  setFontSans: (f: string) => void;
  setFontSerif: (f: string) => void;
  setFontMono: (f: string) => void;
  setMode: (m: PlaygroundMode) => void;
  setActiveToolTab: (tab: PlaygroundToolTab) => void;
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
  radius: defaultPreset.radius,
  spacing: defaultPreset.spacing,
  letterSpacing: defaultPreset.letterSpacing,
  shadow: { ...defaultPreset.shadow },
  fontSans: defaultPreset.fontSans,
  fontSerif: defaultPreset.fontSerif,
  fontMono: defaultPreset.fontMono,
  mode: "light",
  activeToolTab: "colors",

  setActiveLayout: (layout) => set({ activeLayout: layout }),

  setPreset: (presetName) => {
    const preset = THEME_PRESETS.find((p) => p.name === presetName);
    if (!preset) return;
    const { mode } = get();
    set({
      activePreset: presetName,
      themeVars: getPresetVars(preset, mode),
      radius: preset.radius,
      spacing: preset.spacing,
      letterSpacing: preset.letterSpacing,
      shadow: { ...preset.shadow },
      fontSans: preset.fontSans,
      fontSerif: preset.fontSerif,
      fontMono: preset.fontMono,
    });
  },

  setThemeVar: (key, value) =>
    set((state) => ({
      themeVars: { ...state.themeVars, [key]: value } as ThemeVars,
    })),

  setRadius: (r) => set({ radius: r }),
  setSpacing: (s) => set({ spacing: s }),
  setLetterSpacing: (ls) => set({ letterSpacing: ls }),

  setShadowProp: (key, value) =>
    set((state) => ({
      shadow: { ...state.shadow, [key]: value },
    })),

  setFontSans: (f) => set({ fontSans: f }),
  setFontSerif: (f) => set({ fontSerif: f }),
  setFontMono: (f) => set({ fontMono: f }),

  setMode: (m) => {
    const { activePreset } = get();
    const preset = THEME_PRESETS.find((p) => p.name === activePreset);
    if (preset) {
      set({ mode: m, themeVars: getPresetVars(preset, m) });
    } else {
      set({ mode: m });
    }
  },

  setActiveToolTab: (tab) => set({ activeToolTab: tab }),

  resetToPreset: () => {
    const { activePreset, mode } = get();
    const preset = THEME_PRESETS.find((p) => p.name === activePreset);
    if (!preset) return;
    set({
      themeVars: getPresetVars(preset, mode),
      radius: preset.radius,
      spacing: preset.spacing,
      letterSpacing: preset.letterSpacing,
      shadow: { ...preset.shadow },
      fontSans: preset.fontSans,
      fontSerif: preset.fontSerif,
      fontMono: preset.fontMono,
    });
  },
}));
