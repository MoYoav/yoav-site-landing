"use client";

import { useEffect } from "react";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const googleAdsConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const formLocation = "homepage_contact_section";
const pendingLeadKey = "pending_lead_submission_id";
const prefersTagManager = Boolean(gtmId);

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export default function ThankYouTracker() {
  useEffect(() => {
    // Use a one-time marker so local React dev checks do not double-count a lead.
    const submissionId = sessionStorage.getItem(pendingLeadKey);

    if (!submissionId) {
      return;
    }

    sessionStorage.removeItem(pendingLeadKey);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lead_submit_success",
      conversion_type: "lead",
      form_location: formLocation,
      page_type: "thank_you",
      submission_id: submissionId,
    });

    if (!prefersTagManager) {
      window.gtag?.("event", "generate_lead", {
        form_location: formLocation,
        value: 1,
        currency: "USD",
        submission_id: submissionId,
      });

      if (googleAdsId && googleAdsConversionLabel) {
        window.gtag?.("event", "conversion", {
          send_to: `${googleAdsId}/${googleAdsConversionLabel}`,
        });
      }

      if (metaPixelId) {
        window.fbq?.("track", "Lead");
      }
    }
  }, []);

  return null;
}
