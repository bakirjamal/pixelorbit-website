import Script from "next/script";
import type {Metadata} from "next";
import {SiteFooter,SiteHeader} from "../components/site-chrome";
import "./globals.css";
export const metadata:Metadata={title:{default:"Pixel Orbit — Digital Product Design Studio",template:"%s | Pixel Orbit"},description:"Pixel Orbit designs applications, websites and SaaS products with clarity, craft and a distinct visual point of view.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2CGVDLC9E3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2CGVDLC9E3');
          `}
        </Script>
      </body>
    </html>
  );
}
