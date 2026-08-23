import type { Metadata } from "next";
import { DomainPage } from "@/components/domain-page";
import { domainPageCopy } from "@/lib/domain-copy";

export const metadata: Metadata = {
  title: domainPageCopy.fr.metaTitle,
  description: domainPageCopy.fr.metaDescription,
};

export default function DomainesPage() {
  return <DomainPage locale="fr" />;
}
