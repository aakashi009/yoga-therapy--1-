"use client"

import { ArrowLeft, AlertTriangle, Clock, Heart, Shield, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function YogaPrerequisitesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-[#00DF82] hover:text-[#03624C] font-medium transition-colors"
          >
            <ArrowLeft className="mr-2 w-5 h-5" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-[#03624C]/20">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#030F0F] via-[#03624C] to-[#00DF82] text-white p-8">
            <h1 className="text-4xl font-bold mb-4">Yoga Prerequisites & Safety Guidelines</h1>
            <p className="text-xl opacity-90">Essential knowledge for a safe and effective yoga practice</p>
          </div>

          <div className="p-8">
            {/* Important Notice */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-3 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Important Medical Disclaimer</h3>
                  <p className="text-red-700">
                    Always consult with your healthcare provider before starting any new exercise program, especially if
                    you have existing health conditions, injuries, or are pregnant. This information is for educational
                    purposes only and should not replace professional medical advice.
                  </p>
                </div>
              </div>
            </div>

            {/* Prerequisites Sections */}
            <div className="space-y-8">
              {/* Before You Start */}
              <section>
                <div className="flex items-center mb-4">
                  <Shield className="w-8 h-8 text-[#00DF82] mr-3" />
                  <h2 className="text-2xl font-bold text-[#030F0F]">Before You Start</h2>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6 border border-[#00DF82]/20">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#00DF82] mr-3 mt-1" />
                      <span>
                        <strong>Bath:</strong> Taking a bath or a shower both before and after practising asanas refreshes the body and mind.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#00DF82] mr-3 mt-1" />
                      <span>
                        <strong>Cleanliness:</strong> Before starting asana, the bladder should be emptied and bowels evacuated.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#00DF82] mr-3 mt-1" />
                      <span>
                        <strong>Hydration:</strong> Drink water throughout the day, but avoid drinking large amounts
                        just before practice.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#00DF82] mr-3 mt-1" />
                      <span>
                        <strong>Comfortable Clothing:</strong> Wear fastdry, stretchy clothes that allow free
                        movement.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Best Times to Practice */}
              <section>
                <div className="flex items-center mb-4">
                  <Clock className="w-8 h-8 text-[#03624C] mr-3" />
                  <h2 className="text-2xl font-bold text-[#030F0F]">Best Times to Practice</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Morning Practice (6-8 AM)</h3>
                    <ul className="text-blue-700 space-y-2">
                      <li>• Energizes the body for the day</li>
                      <li>• Improves focus and mental clarity</li>
                      <li>• Best for dynamic poses and sun salutations</li>
                      <li>• Remove body stiffness</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-800 mb-3">Evening Practice (6-8 PM)</h3>
                    <ul className="text-purple-700 space-y-2">
                      <li>• Helps release daily stress</li>
                      <li>• Removes the fatigue of the day.</li>
                      <li>• Focus on gentle, restorative poses</li>
                      <li>• Avoid intense poses before bedtime</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* What You'll Need */}
              <section>
                <div className="flex items-center mb-4">
                  <Heart className="w-8 h-8 text-red-600 mr-3" />
                  <h2 className="text-2xl font-bold text-[#030F0F]">Essential Equipment</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-[#030F0F] mb-3">Must-Have Items:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-[#00DF82] mr-2" />
                          <span>Yoga mat (non-slip surface)</span>
                        </li>
                       
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-[#00DF82] mr-2" />
                          <span>Towel for sweat</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#030F0F] mb-3">Helpful Additions:</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-[#03624C] mr-2" />
                          <span>Yoga blocks for support</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-[#03624C] mr-2" />
                          <span>Yoga strap for flexibility</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-[#03624C] mr-2" />
                          <span>Bolster or pillow for restorative poses</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-[#03624C] mr-2" />
                          <span>Blanket for relaxation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contraindications */}
              <section>
                <div className="flex items-center mb-4">
                  <XCircle className="w-8 h-8 text-red-600 mr-3" />
                  <h2 className="text-2xl font-bold text-[#030F0F]">When NOT to Practice</h2>
                </div>
                <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Avoid Yoga If You Have:</h3>
                      <ul className="text-red-700 space-y-2">
                        <li>• Acute illness or fever</li>
                        <li>• Recent surgery (without doctor's approval)</li>
                        <li>• Severe back or neck injury</li>
                        <li>• Uncontrolled high blood pressure</li>
                        <li>• Recent heart attack or stroke</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Modify Practice During:</h3>
                      <ul className="text-red-700 space-y-2">
                        <li>• Pregnancy (seek prenatal yoga)</li>
                        <li>• Menstruation (avoid inversions)</li>
                        <li>• Recovery from injury</li>
                        <li>• Extreme fatigue</li>
                        <li>• Digestive issues</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Safety Guidelines */}
              <section>
                <h2 className="text-2xl font-bold text-[#030F0F] mb-4">General Safety Guidelines</h2>
                <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-1" />
                      <span>
                        <strong>Listen to Your Body:</strong> Never force a pose. If it hurts, back off immediately.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-1" />
                      <span>
                        <strong>Breathe Continuously:</strong> Never hold your breath during poses unless specifically
                        instructed.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-1" />
                      <span>
                        <strong>Progress Gradually:</strong> Start with basic poses and slowly advance to more
                        challenging ones.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-1" />
                      <span>
                        <strong>Stay Hydrated:</strong> Drink water before and after practice, sip during if needed.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-1" />
                      <span>
                        <strong>End with Relaxation:</strong> Always finish your practice with a few minutes of rest in
                        Savasana.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-8 border border-[#00DF82]/20">
              <h3 className="text-2xl font-bold text-[#030F0F] mb-4">Ready to Begin Your Healing Journey?</h3>
              <p className="text-gray-600 mb-6">
                Now that you understand the prerequisites, you're ready to explore yoga poses tailored to your specific
                health needs.
              </p>
              <Link
                href="/"
                className="inline-flex items-center bg-[#00DF82] text-[#030F0F] px-8 py-3 rounded-lg font-semibold hover:bg-[#03624C] hover:text-white transition-colors shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="mr-2 w-5 h-5" />
                Start Your Practice
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
