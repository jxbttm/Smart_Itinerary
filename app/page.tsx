

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex flex-col min-h-screen">
      <main className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-4">Plan Your Dream Trip</h1>
        <p className="text-center text-lg mb-6">Get started by exploring destinations and planning your next adventure.</p>

        <div className="flex gap-4">
          <button className="btn btn-primary py-2 px-6 text-white">Plan a Trip</button>
          <button className="btn btn-neutral py-2 px-6 text-white">Buy us Coffee</button>
        </div>
      </main>
    </div>
  );
}
