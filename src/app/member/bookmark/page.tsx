export default function BookmarkPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Bookmark</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Materi yang kamu tandai.
        </p>
      </div>
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-12 text-center">
        <p className="text-muted-foreground text-sm">
          Belum ada materi yang ditandai.
        </p>
      </div>
    </div>
  );
}
