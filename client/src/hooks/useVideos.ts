import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const useVideos = () => {
  const [videos, setVideos] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .storage
          .from('videos')
          .list()

        if (error) {
          throw error
        }

        const videoUrls = data
          .filter(file => file.name.endsWith('.mp4'))
          .map(file => supabase.storage.from('videos').getPublicUrl(file.name).data.publicUrl)

        setVideos(videoUrls)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch videos')
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return { videos, loading, error }
} 