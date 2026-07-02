import Script from "next/script";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const primaryGoogleTagId = googleAnalyticsId || googleAdsId;

export function TrackingNoScript() {
  if (!gtmId) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}

export default function TrackingScripts() {
  if (!gtmId && !metaPixelId && !primaryGoogleTagId) {
    return null;
  }

  return (
    <>
      {gtmId ? (
        <Script id="gtm-script" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}</Script>
      ) : null}

      {metaPixelId ? (
        <Script id="meta-pixel-script" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${metaPixelId}');
          fbq('track', 'PageView');
        `}</Script>
      ) : null}

      {primaryGoogleTagId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${primaryGoogleTagId}`}
            strategy="afterInteractive"
          />
          <Script id="google-tag-script" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            ${googleAnalyticsId ? `gtag('config', '${googleAnalyticsId}');` : ""}
            ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}
          `}</Script>
        </>
      ) : null}
    </>
  );
}
