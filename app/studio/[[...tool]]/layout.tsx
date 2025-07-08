import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vercel Ecom Site Studio",
  description: "Sanity CMS studio for Vercel Ecom Site",
};

// Separate layout for studio, so that clerk provider is not applied to the studio

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
