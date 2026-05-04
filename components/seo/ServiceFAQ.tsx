"use client"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface Props {
  namespace: string
  count: number
  badge?: string
  title?: string
}

export default function ServiceFAQ({ namespace, count, badge, title }: Props) {
  const t = useTranslations(namespace)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    question: t(`faqs.q${i + 1}.question`),
    answer: t(`faqs.q${i + 1}.answer`),
  }))

  return (
    <section className="relative z-10 py-24 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-white/30 pb-6">
          <p className="text-white/80 text-sm uppercase tracking-widest font-light mb-2">
            {badge ?? t("badge")}
          </p>
          <h2 className="leading-tight font-bold italic text-3xl md:text-5xl bg-gradient-to-r from-[#9C27B0] to-[#E91E63] bg-clip-text text-transparent">
            {title ?? t("title")}
          </h2>
        </header>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <article key={faq.id} className="group relative overflow-hidden rounded-2xl">
              <div
                className={`absolute inset-0 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] transition-opacity duration-300 ${
                  openIndex === index ? "opacity-100" : "opacity-50 group-hover:opacity-75"
                }`}
              />
              <div className="relative bg-[#130218] m-[1px] rounded-[15px]">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4"
                  aria-expanded={openIndex === index}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-[#E91E63] font-mono text-sm border-b border-[#9C27B0] shrink-0 mt-1">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <h3 className="text-white font-semibold text-sm md:text-lg leading-relaxed">
                      {faq.question}
                    </h3>
                  </div>
                  <svg
                    className={`shrink-0 w-6 h-6 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="url(#faqGradient)"
                    viewBox="0 0 24 24"
                  >
                    <defs>
                      <linearGradient id="faqGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#E91E63" />
                        <stop offset="100%" stopColor="#9C27B0" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pl-16">
                    <p className="text-gray-300 text-sm md:text-base md:leading-relaxed md:font-light whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
