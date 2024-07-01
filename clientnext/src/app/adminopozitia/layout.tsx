import { Inter } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Opozitia-adminopozitia",
  description: "Admin panel",
};

export default function RootLayout({children}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
      {children}
    </body>
    </html>
  );
};