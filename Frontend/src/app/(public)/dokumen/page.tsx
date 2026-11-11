import type { Metadata } from "next";
import { DummyNotice, Section } from "@/components/shared/Blocks";
import { PageHero } from "@/components/shared/PageHero";
import { dokumen } from "@/data/dummy";
import { modulePages } from "@/data/site";
import { DocumentList } from "@/features/transparency/DocumentList";

const page = modulePages.dokumen;
export const metadata: Metadata = { title: page.title, description: page.description };

export default function DokumenPage() {
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <DummyNotice />
      <Section id="daftar" eyebrow={["Arsip", "Dokumen Publik"]} title="Daftar Dokumen" tone="tekstur">
        <DocumentList items={dokumen} />
      </Section>
    </>
  );
}
