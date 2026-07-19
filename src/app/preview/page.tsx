import { SectionRegistry, SectionType, SectionSchemas } from "@/config/sections/registry";

interface PreviewPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PreviewPage({ searchParams }: PreviewPageProps) {
  const resolvedParams = await searchParams;
  const sectionType = resolvedParams.section as string;
  const variant = resolvedParams.variant as string;

  if (!sectionType || !variant) {
    return <div className="p-4 text-red-500">Missing section or variant parameter</div>;
  }

  const SectionComponent = SectionRegistry[sectionType as SectionType];
  const schema = SectionSchemas[sectionType as SectionType];

  if (!SectionComponent || !schema) {
    return <div className="p-4 text-red-500">Invalid section type: {sectionType}</div>;
  }

  // Merge default settings with the requested variant
  const settings = {
    ...schema.defaultSettings,
    variant: variant,
  };

  return (
    <div className="w-full">
      <SectionComponent settings={settings} locale="en" />
    </div>
  );
}
