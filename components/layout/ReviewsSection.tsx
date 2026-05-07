"use client"
import { useEffect, useState } from "react"
import Image from "next/image"

interface Review {
  rating: number
  text: { text: string }
  relativePublishTimeDescription: string
  authorAttribution: {
    displayName: string
    photoUri: string
  }
}

interface ReviewsData {
  name: string
  rating: number
  user_ratings_total: number
  reviews: Review[]
}

export default function ReviewsSection() {
  const [data, setData] = useState<ReviewsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/reviews")
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className="text-base"
        style={{ color: i < rating ? "#E91E63" : "rgba(255,255,255,0.2)" }}
      >
        ★
      </span>
    ))
  }

  if (loading) return (
    <div className="flex justify-center py-20">
      <div
        className="h-8 w-8 rounded-full border-2 border-transparent animate-spin"
        style={{ borderTopColor: "#E91E63", borderRightColor: "#9C27B0" }}
      />
    </div>
  )

  // Filtrar solo 4 y 5 estrellas
  const goodReviews = data?.reviews ?? []

  if (!data || goodReviews.length === 0) return null

  return (
    <section className="relative w-full py-12 md:py-16 px-6 md:px-12 lg:px-24 overflow-hidden">

      {/* Fondo decorativo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #E91E63, #9C27B0)" }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-3">Google Reviews</p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-white text-3xl md:text-4xl xl:text-5xl font-bold leading-tight mb-4">
                Lo que dicen{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E91E63] to-[#9C27B0]">
                  nuestros clientes
                </span>
              </h2>

              {/* Rating global */}
              <div className="flex items-center gap-3">
                <div className="flex">{renderStars(Math.round(data.rating))}</div>
                <span
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E91E63] to-[#9C27B0]"
                >
                  {data.rating}
                </span>
                <span className="text-white/40 text-sm">
                  · {data.user_ratings_total} reseñas
                </span>

                {/* Badge Google */}
                <div className="flex items-center gap-1 ml-2 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="text-white/60 text-xs">Google</span>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/place/3R+Core+-+Agencia+de+Marketing/@-12.0912956,-76.9519657,17z/data=!3m1!4b1!4m6!3m5!1s0x9105c710419b833d:0xd38447313365f798!8m2!3d-12.0913009!4d-76.9493908!16s%2Fg%2F11jps9mts_?entry=ttu&g_ep=EgoyMDI2MDIxNi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-xl text-xs tracking-widest uppercase text-white/60 hover:text-white transition-all duration-300 overflow-hidden self-start md:self-auto"
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#E91E63] to-[#9C27B0] transition-opacity duration-300" />
              <span className="relative z-10">Ver en Google</span>
              <svg className="relative z-10 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Grid reseñas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {goodReviews.map((review, index) => (
            <div
              key={index}
              className="group relative rounded-2xl p-px overflow-hidden transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Borde gradiente */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #E91E63, #9C27B0)" }}
              />
              <div className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300 bg-white/10" />

              {/* Contenido */}
              <div className="relative bg-[#0d0014] rounded-2xl p-6 h-full flex flex-col gap-4">

                {/* Comillas decorativas */}
                <div
                  className="text-4xl font-serif leading-none select-none"
                  style={{ color: "#E91E63", opacity: 0.3 }}
                >
                  "
                </div>

                {/* Texto */}
                <p className="text-white/70 text-sm leading-relaxed flex-1 line-clamp-5">
                  {review.text.text}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden ring-1 ring-white/10">
                      <Image
                        src={review.authorAttribution.photoUri}
                        alt={review.authorAttribution.displayName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold leading-tight">
                        {review.authorAttribution.displayName}
                      </p>
                      <p className="text-white/30 text-xs">
                        {review.relativePublishTimeDescription}
                      </p>
                    </div>
                  </div>

                  {/* Estrellas */}
                  <div className="flex gap-px">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}