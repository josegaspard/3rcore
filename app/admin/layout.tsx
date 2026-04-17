import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin - 3R Core Blog CMS",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#0D0010] text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
