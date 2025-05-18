import React, { useState } from 'react'
import { useVideos } from '../hooks/useVideos'
import Container from '../components/Container'
import { motion } from 'framer-motion'

const VIDEOS_PER_PAGE = 6

const AllVideos = () => {
  const { videos, loading, error } = useVideos()
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE)
  const paginatedVideos = videos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE
  )

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1))
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages))

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center">
          <div className="animate-spin h-10 w-10 border-4 border-black border-t-transparent"></div>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <div className="text-red-700 bg-red-200 border-4 border-black p-4 text-center font-mono">
          ⚠️ Error: {error}
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <h1 className="text-4xl font-extrabold text-black text-center border-4 border-black p-4 bg-white">
        ALL VIDEOS
      </h1>

      {videos.length === 0 && (
        <div className="mt-6 text-center font-bold text-black bg-yellow-200 border-4 border-black p-4">
          No videos found. Make something!
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8">
        {paginatedVideos.map((videoUrl, index) => (
          <motion.div
            key={videoUrl}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border-4 border-black bg-white p-2 hover:scale-[1.02] transition-transform duration-200"
          >
            <video
              controls
              className="w-full aspect-video border-4 border-black bg-yellow-100"
              src={videoUrl}
            />
          </motion.div>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border-4 border-black text-black font-bold hover:bg-yellow-300 disabled:opacity-50 transition-colors duration-200"
          >
            ⬅ Prev
          </button>
          <span className="font-mono text-lg bg-black text-white px-4 py-1 border-4 border-white">
            Page {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border-4 border-black text-black font-bold hover:bg-yellow-300 disabled:opacity-50 transition-colors duration-200"
          >
            Next ➡
          </button>
        </div>
      )}
    </Container>
  )
}

export default AllVideos
