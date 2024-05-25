export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center items-center h-screen bg-[#f9f9f9]">
      <div className="w-[500px] h-full">{children}</div>
    </main>
  );
}
