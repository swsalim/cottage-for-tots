import Link from 'next/link'

type Project = {
  url: string
  name: string
  target: '_blank' | '_self'
}
const projects: Project[] = [
  {
    url: 'https://pfpresizer.com/?ref=cottagefortots.com',
    name: 'PFP Resizer',
    target: '_blank',
  },
  {
    url: 'https://www.flipanimage.xyz/?ref=cottagefortots.com',
    name: 'Flip Image',
    target: '_blank',
  },
  {
    url: 'https://www.cmyktopantone.com/?ref=cottagefortots.com',
    name: 'CMYK to Pantone',
    target: '_blank',
  },
  {
    url: 'https://www.rgbtopantone.com/?ref=cottagefortots.com',
    name: 'RGB to Pantone',
    target: '_blank',
  },
  {
    url: 'https://www.randomnumberapp.com/?ref=cottagefortots.com',
    name: 'Random Number App',
    target: '_blank',
  },
  {
    url: 'https://www.clinicgeek.com/?ref=cottagefortots.com',
    name: 'Clinic Geek',
    target: '_blank',
  },
  {
    url: 'https://www.wateraday.com/?ref=cottagefortots.com',
    name: 'Water A Day',
    target: '_blank',
  },
  {
    url: 'https://www.sudokuunlimited.com/?ref=cottagefortots.com',
    name: 'Sudoku Unlimited',
    target: '_blank',
  },
  {
    url: 'https://www.willitraintomorrow.com/?ref=cottagefortots.com',
    name: 'Will It Rain Tomorrow?',
    target: '_blank',
  },
  {
    url: 'https://www.mainan.fun/?ref=cottagefortots.com',
    name: 'mainan.fun',
    target: '_blank',
  },
  {
    url: 'https://www.indieworldmap.com/?ref=cottagefortots.com',
    name: 'Indie World Map',
    target: '_blank',
  },
  {
    url: 'https://www.byeindonesia.com/?ref=cottagefortots.com',
    name: 'Bye Indonesia',
    target: '_blank',
  },
  {
    url: 'https://www.keywordgap.com/?ref=cottagefortots.com',
    name: 'Keyword Gap',
    target: '_blank',
  },
  {
    url: 'https://www.dentalclinicclosetome.my/?ref=cottagefortots.com',
    name: 'Dental Clinic Malaysia',
    target: '_blank',
  },
]

export default function Footer() {
  return (
    <footer className="" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-8 text-center">
        <h3 className="mb-4 text-2xl font-bold capitalize tracking-tight text-slate-900 sm:mb-8 sm:text-3xl">
          Check out our other projects
        </h3>
        <div className="mb-10 grid grid-cols-2 items-center justify-center gap-4 md:mb-12 md:grid-cols-4 lg:grid-cols-5">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target={project.target}
              rel="noopener noreferrer"
              className="text-sm font-medium underline underline-offset-4 transition hover:no-underline"
            >
              {project.name}
            </a>
          ))}
        </div>
        <p className="text-sm leading-5 text-slate-900">
          &copy; {` `}
          {new Date().getFullYear()} {` `}
          cottagefortots.com.
          <span className="ml-2 mt-0 inline-block text-slate-900">
            Built by{' '}
            <a
              href="https://www.yuurrific.com"
              className="inline-block font-medium underline underline-offset-4"
              target="_blank"
            >
              Yuurrific
            </a>
            .
          </span>
          <span className="mt-2 block text-slate-900 md:ml-2 md:mt-0 md:inline-block">
            Privacy-friendly analytics by{' '}
            <Link
              href="/get/simpleanalytics"
              className="inline-block rotate-0 rounded-md bg-blue-600 px-2 py-1 text-slate-100 transition duration-100 ease-out hover:-rotate-3 hover:ease-in"
              target="_blank"
            >
              SimpleAnalytics
            </Link>
          </span>
        </p>
      </div>
    </footer>
  )
}
