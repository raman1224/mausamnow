import  { type PropsWithChildren } from 'react'
import Header from './header'


const Layout = ({children}: PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br from-background to-muted'>
<Header />
<main className='min-h-screen container mx-auto px-4 py-8'>
        {children}

</main>
      <footer className='border-t backdrop-blur py-12'>
       <div className="container mx-auto px-4 py-8 text-center text-gray-400 flex flex-col items-center">
  <img 
    src="/g5.png" 
    alt="Dangol AI Logo" 
    className="h-12 w-12 rounded-full mb-2" 
  />
  <p>
    Made with{" "}
    <a
      href="https://raman1224.github.io/DANGOL_AI"
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:text-primary/80 transition-colors duration-200 font-medium"
    >
      DANGOl AI
    </a>
  </p>
</div>

      </footer>
    </div>
  )
}

export default Layout
