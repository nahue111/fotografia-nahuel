export function TextureCard({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-2xl border border-white/70 bg-gradient-to-b from-[#F9F8F4] to-white/60 ${className}`}
      {...props}
    >
      <div className="rounded-[23px] border border-black/[0.06]">
        <div className="rounded-[22px] border border-white/60">
          <div className="rounded-[21px] border border-neutral-900/[0.08]">
            <div className="w-full border border-white/50 rounded-[20px] text-neutral-500">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TextureCardContent({ children, className = '', ...props }) {
  return (
    <div className={`px-7 py-6 ${className}`} {...props}>
      {children}
    </div>
  )
}
