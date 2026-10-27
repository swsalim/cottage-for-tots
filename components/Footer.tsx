import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type Project = {
  url: string
  name: string
}

const projects: Project[] = [
  { url: 'https://pfpresizer.com/?ref=cottagefortots.com', name: 'PFP Resizer' },
  { url: 'https://www.flipanimage.xyz/?ref=cottagefortots.com', name: 'Flip Image' },
  { url: 'https://www.cmyktopantone.com/?ref=cottagefortots.com', name: 'CMYK to Pantone' },
  { url: 'https://www.rgbtopantone.com/?ref=cottagefortots.com', name: 'RGB to Pantone' },
  { url: 'https://www.randomnumberapp.com/?ref=cottagefortots.com', name: 'Random Number App' },
  { url: 'https://www.clinicgeek.com/?ref=cottagefortots.com', name: 'Clinic Geek' },
  { url: 'https://www.wateraday.com/?ref=cottagefortots.com', name: 'Water A Day' },
  { url: 'https://www.sudokuunlimited.com/?ref=cottagefortots.com', name: 'Sudoku Unlimited' },
  { url: 'https://www.willitraintomorrow.com/?ref=cottagefortots.com', name: 'Will It Rain Tomorrow?' },
  { url: 'https://www.mainan.fun/?ref=cottagefortots.com', name: 'mainan.fun' },
  { url: 'https://www.indieworldmap.com/?ref=cottagefortots.com', name: 'Indie World Map' },
  { url: 'https://www.byeindonesia.com/?ref=cottagefortots.com', name: 'Bye Indonesia' },
  { url: 'https://www.keywordgap.com/?ref=cottagefortots.com', name: 'Keyword Gap' },
  { url: 'https://www.dentalclinicclosetome.my/?ref=cottagefortots.com', name: 'Dental Clinic Malaysia' },
]

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="border-t">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-6xl px-4 py-10 text-center">
        <h3 className="text-2xl">Check out our other projects</h3>
        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {projects.map((project) => (
            <li key={project.name}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {project.name}
              </a>
            </li>
          ))}
        </ul>
        <Separator className="my-8" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} cottagefortots.com. Built by{' '}
          <a
            href="https://www.yuurrific.com"
            className="underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yuurrific
          </a>
          .
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Privacy-friendly analytics by{' '}
          <Button variant="outline" size="sm" asChild>
            <Link href="/get/simpleanalytics">SimpleAnalytics</Link>
          </Button>
        </p>
      </div>
    </footer>
  )
}
