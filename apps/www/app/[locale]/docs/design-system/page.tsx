import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDesignSystemDictionary } from "@/lib/design-system-dictionary";
import { DsHeader } from "@/components/design-system/ds-header";
import { DsPrinciples } from "@/components/design-system/ds-principles";
import { DsColors } from "@/components/design-system/ds-colors";
import { DsTypography } from "@/components/design-system/ds-typography";
import { DsSpacing } from "@/components/design-system/ds-spacing";
import { DsGlass } from "@/components/design-system/ds-glass";
import { DsGradients } from "@/components/design-system/ds-gradients";
import { DsAnimations } from "@/components/design-system/ds-animations";
import { DsBorders } from "@/components/design-system/ds-borders";
import { DsIcons } from "@/components/design-system/ds-icons";
import { DsToc } from "@/components/design-system/ds-toc";

type Locale = "en" | "es";
const LOCALES: Locale[] = ["en", "es"];
function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDesignSystemDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

const TOC_SECTIONS_EN = [
  { id: "overview", label: "Overview" },
  { id: "principles", label: "Principles" },
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "glass", label: "Glass" },
  { id: "gradients", label: "Gradients" },
  { id: "animations", label: "Animations" },
  { id: "borders", label: "Borders & Form" },
  { id: "icons", label: "Icons" },
];

const TOC_SECTIONS_ES = [
  { id: "overview", label: "Visión general" },
  { id: "principles", label: "Principios" },
  { id: "colors", label: "Colores" },
  { id: "typography", label: "Tipografía" },
  { id: "spacing", label: "Espaciado" },
  { id: "glass", label: "Cristal" },
  { id: "gradients", label: "Degradados" },
  { id: "animations", label: "Animaciones" },
  { id: "borders", label: "Bordes y Forma" },
  { id: "icons", label: "Iconos" },
];

export default async function DesignSystemPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDesignSystemDictionary(locale);
  const tocSections = locale === "es" ? TOC_SECTIONS_ES : TOC_SECTIONS_EN;

  return (
    <div className="min-w-0">
      {/* Page header */}
      <DsHeader copy={dict.hero} />

      {/* Sections — flat, like MDX article content */}
      <div className="mt-8 space-y-0 min-w-0">
        <DsPrinciples copy={dict.principles} />
        <DsColors copy={dict.colors} />
        <DsTypography copy={dict.typography} />
        <DsSpacing copy={dict.spacing} />
        <DsGlass copy={dict.glass} />
        <DsGradients copy={dict.gradients} />
        <DsAnimations copy={dict.animations} />
        <DsBorders copy={dict.borders} />
        <DsIcons copy={dict.icons} />

        {/* Footer */}
        <div className="flex items-start gap-4 border-t pt-10 pb-10">
          <div
            className="mt-1.5 h-px w-12 shrink-0"
            style={{
              background: "linear-gradient(90deg, var(--primary), transparent)",
            }}
          />
          <p className="font-ibm text-[12px] leading-relaxed text-muted-foreground">
            {locale === "es"
              ? "Este sistema de diseño es una referencia viva — evoluciona con cada componente que se añade a la librería."
              : "This design system is a living reference — it evolves with every component added to the library."}
          </p>
        </div>
      </div>

      {/* ToC — fixed aside, exactly like TableOfContents */}
      <DsToc sections={tocSections} />
    </div>
  );
}
