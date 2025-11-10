import { Community } from "../community";
import { CTA } from "../cta";
import { Footer } from "../footer";
import { Header } from "../header";
import { Hero } from "../hero";


export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      {/* <Features /> */}
      <Community />
      <CTA />
      <Footer />
    </main>
  )
}
