import { useTheme } from '@/context/theme-provider' 
import { Moon, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import CitySearch from './city-search'

const Header = () => {
    const { theme, setTheme } = useTheme()
    const isDark = theme ==="dark";
  return (
     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
     <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to={"/"}>
          <img
            src={isDark ? "/logo-dark.png" : "/logo-light.png"}
            alt="Klimate logo"
            className="h-20"
          />
        </Link>
        <div className='flex items-center gap-4'>  
          <CitySearch />

        <div 
        className={`flex items-center cursor-pointer duration-500 transition-transform ${isDark? "rotate-180": "rotate-0"} `}
        onClick={()=>setTheme(isDark? "light" : "dark")}
        >
{isDark? <Sun className='h-6 w-6 text-yellow-500 rotate-180 transition-all' /> : <Moon className='h-6 w-6 text-yellow-600 rotate=0 transition-all'/> }      </div>
   </div>
    </div>
   </header>
  )
}

export default Header
