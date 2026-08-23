import type { Metadata } from "next";
import { DomainPage } from "@/components/domain-page";
import { domainPageCopy } from "@/lib/domain-copy";

export const metadata: Metadata = {
  title: domainPageCopy.de.metaTitle,
  description: domainPageCopy.de.metaDescription,
};

export default function DomainsPage() {
  return <DomainPage locale="de" />;
}
