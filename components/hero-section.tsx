import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-[#030F0F] via-[#03624C] to-[#00DF82] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Heal Your Body Through Yoga</h1>
            <p className="text-xl mb-8">
              Work alone is your priviledge, never the fruits thereof.Never let the fruits of action be your motive; and
              never cease to work.Work in the name of the lord,abandoning selfish desires.Be not affected by success or
              failure. -Bhagavad Gita
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 flex-1 min-w-[200px] border border-[#00DF82]/20">
                <h3 className="font-semibold text-lg text-[#00DF82]"> B.K.S. Iyengar</h3>
                <p>
                  "The rhythm of the body, the melody of the mind, and the harmony of the soul create the symphony of
                  life."
                </p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 flex-1 min-w-[200px] border border-[#00DF82]/20">
                <h3 className="font-semibold text-lg text-[#00DF82]">Debasish Mridha</h3>
                <p>
                  "You may not be able to control the whole world, but you may learn to control your inner world through
                  yoga."
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 flex-1 min-w-[200px] border border-[#00DF82]/20">
                <h3 className="font-semibold text-lg text-[#00DF82]">Gautama Buddha</h3>
                <p>"Peace comes from within. Do not seek it without."</p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 flex-1 min-w-[200px] border border-[#00DF82]/20">
                <h3 className="font-semibold text-lg text-[#00DF82]">Patanjali </h3>
                <p>"Yoga takes you into the present moment. The only place where life exists." </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md h-[325px] rounded-lg shadow-lg overflow-hidden border-2 border-[#00DF82]">
              <Image
                src="/images/yoga-meditation-hero.png"
                alt="Yoga Meditation - Find Your Inner Peace"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
