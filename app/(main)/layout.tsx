import Navbar from "@/components/shared/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-clip">
      <Navbar/>
      <main className="flex grow flex-col pt-16 bg-slate-50"> 
        {children}
      </main>
    </div>
  );
}