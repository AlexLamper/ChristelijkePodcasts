import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface PodcastCardProps {
  title: string
  author: string
  imageUrl: string
}

const PodcastCard = ({ title, author, imageUrl }: PodcastCardProps) => {
  return (
    <Card className="bg-gray-900 hover:bg-gray-800 transition-colors">
      <CardContent className="p-3 md:p-4">
        <div className="aspect-square relative mb-2 md:mb-4">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <h3 className="font-semibold text-white text-sm md:text-base truncate">{title}</h3>
        <p className="text-xs md:text-sm text-gray-400 truncate">{author}</p>
      </CardContent>
    </Card>
  )
}

export default PodcastCard

