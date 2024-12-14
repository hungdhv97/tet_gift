import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="flex min-h-screen flex-col justify-between">
            <Header />
            <div className="flex-1 bg-gray-100 py-4 relative">
                {children}
            </div>
            <Footer />
        </section>

    );
}
