import { useStaticQuery } from "./useStaticQuery";
import { APP_NAME } from "@/constants";

export interface SiteMetadata {
  name: string;
  tagline: string;
  locale: string;
}

// Simulate async fetch; later can be replaced with real API/GraphQL.
async function fetchSiteMetadata(): Promise<SiteMetadata> {
  return {
    name: APP_NAME,
    tagline: "منصتك الذكية للقراءة والتحليل",
    locale: "ar",
  };
}

export function useSiteMetadata() {
  return useStaticQuery(["site-metadata"], fetchSiteMetadata);
}
