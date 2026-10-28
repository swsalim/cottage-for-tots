import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="border-t">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-6xl px-4 py-10 text-center">
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
            <a
              href="https://go.yuurrific.com/seline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Seline
            </a>
          </Button>
        </p>
      </div>
    </footer>
  )
}
