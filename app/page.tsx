import PodcastCard from "@/components/PodcastCard"

const podcasts = [
  { id: 1, title: "Tech Talk", author: "Jane Doe", imageUrl: "/placeholder.svg?height=400&width=400" },
  { id: 2, title: "Science Hour", author: "John Smith", imageUrl: "/placeholder.svg?height=400&width=400" },
  { id: 3, title: "History Unveiled", author: "Emma Wilson", imageUrl: "/placeholder.svg?height=400&width=400" },
  { id: 4, title: "Comedy Central", author: "Mike Johnson", imageUrl: "/placeholder.svg?height=400&width=400" },
  { id: 5, title: "True Crime Stories", author: "Sarah Brown", imageUrl: "/placeholder.svg?height=400&width=400" },
  { id: 6, title: "Mindfulness Meditation", author: "David Lee", imageUrl: "/placeholder.svg?height=400&width=400" },
]

export default function Home() {
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">Populaire Podcasts</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {podcasts.map((podcast) => (
          <PodcastCard
            key={podcast.id}
            title={podcast.title}
            author={podcast.author}
            imageUrl={podcast.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}

