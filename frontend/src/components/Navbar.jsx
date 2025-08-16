import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

const Navbar = () => {
  const userId = localStorage.getItem('userID')
  const fullname = localStorage.getItem('fullname')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('userID')
    localStorage.removeItem('fullname')
    toast.success('Logout Successfull')
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }


  return (
    <header className="px-4 md:px-6 bg-none">
      <div className="flex h-17 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="font-extrabold text-xl hover:text-primary/90" style={{ color: 'black' }}>
          <span style={{ fontSize: '35px' }}>🏍️</span> MOTORENTAL
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 ms-auto mt-4">
          {/* Desktop Menu */}
          <NavigationMenu className="max-md:hidden">
            <NavigationMenuList className="gap-4">
              {!userId ? (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/login" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                        Login
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/about" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                        About
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/bike-listing" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                        Bike Listing
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/admin-login" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                        Admin
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <Button asChild size="sm" className="text-sm">
                    <Link to="/register" style={{ color: "black" }}>
                      Get Started
                    </Link>
                  </Button>
                </>) : (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/about" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                        About
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/bike-listing" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                        Bike Listing
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <p className="text-pink-500">{fullname}</p>
                    <NavigationMenuItem>
                      <NavigationMenuLink>
                        <Link to='/user-booking' className="font-medium text-sm !text-pink-500">My Bookings</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <button
                        className='mb-1 px-6 py-2 shadow-md bg-red-500 text-white font-semibold cursor-pointer rounded hover:bg-pink-600 transition duration-200'
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </>)}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Hamburger Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="group size-8 md:hidden" variant="ghost" size="icon">
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12L20 12" className="origin-center -translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]" />
                  <path d="M4 12H20" className="origin-center transition-all duration-300 group-aria-expanded:rotate-45" />
                  <path d="M4 12H20" className="origin-center translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-1">
                  {!userId ? (
                    <>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link to="/" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                            Home
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link to="/login" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                            Login
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link to="/about" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                            About
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link to="/admin-login" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                            Admin
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <Button asChild size="sm" className="text-sm">
                        <Link to="/register" style={{ color: "black" }}>
                          Get Started
                        </Link>
                      </Button>
                    </>) : (
                    <>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link to="/" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                            Home
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link to="/about" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                            About
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link to="/bike-listing" className="text-muted-foreground hover:text-primary py-1.5 font-medium" style={{ color: "black" }}>
                            Bike Listing
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <p className="text-pink-500">{fullname}</p>
                       <NavigationMenuItem>
                      <NavigationMenuLink>
                        <Link to='/user-booking' className="font-medium text-sm !text-pink-500">My Bookings</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <button
                            className='mb-1 px-6 py-2 shadow-md bg-red-500 text-white font-semibold cursor-pointer rounded hover:bg-pink-600 transition duration-200'
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </>)}

                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>
        <ToastContainer />
      </div>
    </header>
  )
}

export default Navbar
