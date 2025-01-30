import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from '@/components/main-nav';
import { Footer } from '@/components/footer';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Sujal Unfolded",
  description: "Sujal Unfolded is a personal blog where Sujal shares his experiences, insights, and stories about life, technology, and creativity. Join the journey of exploration and self-expression.",
  keywords: "Sujal Unfolded, Personal Blog, Life Insights, Technology, Creativity, Blogging, Stories, Self-expression, Experiences, Exploration",
  icons: {
    icon: "https://sdrive.blr1.cdn.digitaloceanspaces.com/files/4cfb797bd42593aaf2b981960f6966d3.gif",
  },
  openGraph: {
    title: "Sujal Unfolded",
    description: "Sujal Unfolded is a personal blog where Sujal shares his experiences, insights, and stories about life, technology, and creativity. Join the journey of exploration and self-expression.",
    url: "https://blog.sujal.info",
    type: "website",
    images: [
      {
        url: "https://sdrive.blr1.cdn.digitaloceanspaces.com/files/8f3886bc3b3434b34a9e69dd6c015473.png",
        width: 1661,
        height: 915,
        alt: "Sujal Unfolded",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujal Unfolded",
    description: "Sujal shares stories, experiences, and insights about life, technology, and creativity. Explore his personal blogging journey.",
    images: [
      {
        url: "https://sdrive.blr1.cdn.digitaloceanspaces.com/files/8f3886bc3b3434b34a9e69dd6c015473.png",
        width: 1661,
        height: 915,
        alt: "Sujal Unfolded",
      },
    ],
  },
  robots: "index,follow",
  metadataBase: new URL("https://blog.sujal.info"),
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-DPQ9X6G7Z3"></Script>
<Script id="ga-script">
{`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-1QRHFT1BEY');
`}
</Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <NextTopLoader color='#4682B4' showSpinner={false}/>
          <MainNav />
          {children}
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}