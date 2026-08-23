import type { Metadata } from "next";
import { DomainPage } from "@/components/domain-page";
import { domainPageCopy } from "@/lib/domain-copy";

export const metadata: Metadata = {
  title: domainPageCopy.es.metaTitle,
  description: domainPageCopy.es.metaDescription,
};

export default function DominiosPage() {
  return <DomainPage locale="es" />;
}
