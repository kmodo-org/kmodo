import Link from 'next/link'
import { Button } from '~/components/ui/button';
import "~/styles/globals.css";
 
export default function NotFound() {
  return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className='flex flex-row items-center justify-center pb-5'>
                <span className="text-4xl font-bold text-accent">404</span>
                <span className="text-4xl font-bold text-muted-foreground pl-5">|</span>
                <span className="text-4xl font-bold text-foreground pl-5">Page not found</span>
            </div>
            <Link href="/" className='mt-4'>
                <Button className='bg-accent text-foreground hover:text-accent transform transition hover:scale-105 hover:underline hover:font-bold hover:bg-foreground'>              
                    <span>Go back home</span>
                </Button>
            </Link>
        </div>
  )
}