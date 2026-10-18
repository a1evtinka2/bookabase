export default function OpenBookModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Book */}
      ```tsx
      <div className="relative w-full max-w-4xl">
        <div className="grid grid-cols-2">
          {/* Left page */}
          <section
            className="
        relative min-h-[320px] overflow-hidden
        rounded-l-[45%] rounded-r-[8%]
        border-y border-l border-amber-900/20
        bg-[#f6edda]
        px-6 py-10 sm:px-10 sm:py-14 md:min-h-[420px] md:px-14
        shadow-[-8px_10px_20px_rgba(0,0,0,0.18)]
        before:absolute before:inset-y-0 before:right-0
        before:w-8 before:rounded-l-[100%]
        before:bg-gradient-to-r before:from-amber-900/15 before:to-transparent
      "
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-900/60">
              Chapter I
            </p>
            <h2 className="mt-5 font-marck text-3xl text-stone-800 sm:text-4xl md:text-5xl">
              The beginning
            </h2>
          </section>

          {/* Right page */}
          <section
            className="
        relative min-h-[320px] overflow-hidden
        rounded-l-[8%] rounded-r-[45%]
        border-y border-r border-amber-900/20
        bg-[#f2e7d0]
        px-6 py-10 sm:px-10 sm:py-14 md:min-h-[420px] md:px-14
        shadow-[8px_10px_20px_rgba(0,0,0,0.18)]
        before:absolute before:inset-y-0 before:left-0
        before:w-8 before:rounded-r-[100%]
        before:bg-gradient-to-l before:from-amber-900/15 before:to-transparent
      "
          >
            <p className="text-right font-mono text-xs uppercase tracking-[0.25em] text-amber-900/60">
              Chapter II
            </p>
            <h2 className="mt-5 text-right font-marck text-3xl text-stone-800 sm:text-4xl md:text-5xl">
              A new story
            </h2>
          </section>
        </div>

        {/* Book spine shading */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-4 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-950/20 to-transparent" />
      </div>
      ```
    </div>
  );
}
