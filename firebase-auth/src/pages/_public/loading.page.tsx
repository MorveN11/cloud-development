export function LoadingPage() {
  return (
    <main className="custom-container flex h-screen w-full flex-col items-center justify-center gap-4">
      <div className="h-24 w-24 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      <p className="animate-pulse font-semibold text-muted-foreground">Loading...</p>
    </main>
  );
}
