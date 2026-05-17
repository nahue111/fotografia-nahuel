export default function Footer() {
  return (
    <footer className="border-t border-[rgba(0,0,0,0.06)] py-10 bg-[#F7F5F0]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="h-16 w-16 rounded-full overflow-hidden bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.06)] flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Next Photograph"
            className="h-[110%] w-[110%] object-contain"
          />
        </div>

        <p className="text-[11px] text-muted tracking-[0.1em] font-sans text-center">
          © {new Date().getFullYear()} Next Photograph — Nahuel López — Montevideo, Uruguay
        </p>

        <div className="flex gap-8 text-[11px] text-muted font-sans tracking-[0.08em]">
          <a href="#" className="hover:text-off-black transition-colors duration-200">
            Instagram
          </a>
          <a href="#" className="hover:text-off-black transition-colors duration-200">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  )
}
