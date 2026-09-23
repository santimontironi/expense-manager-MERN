type EmptyStateProps = {
  icon: string
  title: string
  description: string
}

const EmptyState = ({ icon, title, description }: EmptyStateProps) => (
  <div className="mt-10 rounded-3xl border border-dashed border-ink/25 px-6 py-14 text-center md:py-20">
    <i className={`bi ${icon} text-4xl text-ink/40 md:text-5xl`}></i>
    <h3 className="mt-4 text-xl font-semibold text-ink">{title}</h3>
    <p className="mx-auto mt-2 max-w-[38ch] leading-relaxed text-ink/70">{description}</p>
  </div>
)

export default EmptyState
