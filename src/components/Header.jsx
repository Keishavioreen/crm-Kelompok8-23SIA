import { Search, User, Bell } from 'lucide-react'

const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-tosca shadow-sm border-b sticky top-0 z-10">
      <div className="text-sm text-white">
        Pages / <span className="font-semibold">Dashboard</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Type here..."
            className="px-4 py-2 pl-10 text-sm rounded-full focus:outline-none bg-white text-black border border-gray-300"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
        <Bell className="w-5 h-5 text-white cursor-pointer hover:text-tosca-100 transition" />
        <div className="flex items-center gap-2 text-sm cursor-pointer text-white hover:text-tosca-100 transition">
          <User className="w-4 h-4" />
          Sign In
        </div>
      </div>
    </header>
  )
}

export default Header
