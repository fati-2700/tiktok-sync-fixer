import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import { ToastProvider } from "@/components/ui/use-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TikTok Sync Fixer",
  description: "Sincronización de inventario entre Shopify y TikTok Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  // Si no hay clave de Clerk, mostrar error amigable
  if (!clerkPublishableKey) {
    return (
      <html lang="es">
        <body className={inter.className}>
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center max-w-md">
              <h1 className="text-2xl font-bold mb-4">Error de Configuración</h1>
              <p className="text-muted-foreground mb-4">
                Falta la variable de entorno <code className="bg-muted px-2 py-1 rounded">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>
              </p>
              <p className="text-sm text-muted-foreground">
                Por favor, configura las variables de entorno en Vercel Dashboard.
              </p>
            </div>
          </div>
        </body>
      </html>
    )
  }

  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <html lang="es">
        <body className={inter.className}>
          <ToastProvider>
            {children}
          </ToastProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
