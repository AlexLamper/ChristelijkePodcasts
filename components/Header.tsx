import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

const Header = () => {
  return (
    <header className="bg-black p-4 lg:p-6 sticky top-0 z-10 lg:pl-6">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="Zoek naar podcasts"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-black"
          />
        </div>
      </div>
    </header>
  )
}

export default Header

