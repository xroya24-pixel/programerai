export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Kelola akun dan preferensimu.
        </p>
      </div>
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-8 max-w-lg space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xl font-bold text-primary">
            A
          </div>
          <div>
            <h2 className="text-lg font-semibold">Anonymous</h2>
            <p className="text-sm text-muted-foreground">anonymous@email.com</p>
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-6 space-y-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Nama</label>
            <input
              type="text"
              defaultValue="Anonymous"
              className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5">Email</label>
            <input
              type="email"
              defaultValue="anonymous@email.com"
              className="w-full h-9 px-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-sm text-foreground focus:outline-none focus:border-primary/30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
