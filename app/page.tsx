import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import YogaContent from "@/components/yoga-content"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        {/* Prerequisites Section - Full Width */}
        <div className="mb-6">
          <YogaContent showOnlyPrerequisites={true} />
        </div>

        {/* Main Content Area with Sidebar and Welcome/Poses */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <Sidebar />
          <YogaContent showOnlyPrerequisites={false} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
