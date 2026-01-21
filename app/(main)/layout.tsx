import Navbar from "@/components/shared/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-clip">
      <Navbar/>
      <main className="container flex grow flex-col pt-20 pb-8"> 
        {children}
      </main>
    </div>
  );
}