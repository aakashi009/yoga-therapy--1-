import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 border border-[#03624C]/20">
          <h1 className="text-3xl font-bold text-[#030F0F] mb-6">Contact Us</h1>

          <div className="mb-8">
            <p className="text-gray-700 mb-4">
              Do you have questions about yoga therapy or need personalized advice about your health problem? Fill out
              the given form below and we will reach you in 24 hours.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-[#030F0F] mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00DF82] focus:border-[#00DF82] transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-[#030F0F] mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00DF82] focus:border-[#00DF82] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#030F0F] mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00DF82] focus:border-[#00DF82] transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[#030F0F] mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00DF82] focus:border-[#00DF82] transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#030F0F] mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00DF82] focus:border-[#00DF82] transition-colors"
                required
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-[#00DF82] text-[#030F0F] font-medium rounded-md hover:bg-[#03624C] hover:text-white transition-colors shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </div>
          </form>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-[#030F0F] mb-4">Our Location</h2>
              <p className="text-gray-700">Dayalbagh Educational Institute Agra</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#030F0F] mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-2">
                <strong className="text-[#00DF82]">Email:</strong> sakshamspeaks10@gmail.com
              </p>
              <p className="text-gray-700 mb-2">
                <strong className="text-[#00DF82]">Phone:</strong> +91-941056XXXX
              </p>
              <p className="text-gray-700">
                <strong className="text-[#00DF82]">Hours:</strong> Saturday-Sunday, 7pm-9pm
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}