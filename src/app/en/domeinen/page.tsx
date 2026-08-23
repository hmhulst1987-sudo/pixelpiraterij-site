import type { Metadata } from "next";
import { DomainPage } from "@/components/domain-page";
import { domainPageCopy } from "@/lib/domain-copy";

export const metadata: Metadata = {
  title: domainPageCopy.en.metaTitle,
  description: domainPageCopy.en.metaDescription,
};

export default function DomainsPage() {
  return <DomainPage locale="en" />;
}
