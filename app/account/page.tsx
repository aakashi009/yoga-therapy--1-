"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#03624C]/10">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-[#00DF82] data-[state=active]:text-[#030F0F]"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-[#00DF82] data-[state=active]:text-[#030F0F]"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="bg-white p-6 rounded-lg shadow mt-4 border border-[#03624C]/20">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#030F0F]">Welcome Back</h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setIsLoggedIn(true)
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#030F0F]">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="focus:ring-[#00DF82] focus:border-[#00DF82]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#030F0F]">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      className="focus:ring-[#00DF82] focus:border-[#00DF82]"
                    />
                  </div>
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-[#00DF82] hover:bg-[#03624C] text-[#030F0F] hover:text-white"
                    >
                      Sign In
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    <a href="#" className="text-[#00DF82] hover:text-[#03624C] hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register" className="bg-white p-6 rounded-lg shadow mt-4 border border-[#03624C]/20">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#030F0F]">Create Account</h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setIsLoggedIn(true)
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#030F0F]">
                      Full Name
                    </Label>
                    <Input id="name" type="text" required className="focus:ring-[#00DF82] focus:border-[#00DF82]" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-[#030F0F]">
                      Email
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="focus:ring-[#00DF82] focus:border-[#00DF82]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-[#030F0F]">
                      Password
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      required
                      className="focus:ring-[#00DF82] focus:border-[#00DF82]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-[#030F0F]">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      className="focus:ring-[#00DF82] focus:border-[#00DF82]"
                    />
                  </div>
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-[#00DF82] hover:bg-[#03624C] text-[#030F0F] hover:text-white"
                    >
                      Create Account
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow border border-[#03624C]/20">
          <div className="p-6 border-b border-[#03624C]/20">
            <h1 className="text-2xl font-bold text-[#030F0F]">My Account</h1>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00DF82] to-[#03624C] flex items-center justify-center text-[#030F0F] text-2xl font-bold mr-4">
                JS
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#030F0F]">John Smith</h2>
                <p className="text-gray-600">john.smith@example.com</p>
              </div>
              <Button
                variant="outline"
                className="ml-auto border-[#03624C] text-[#03624C] hover:bg-[#03624C] hover:text-white"
                onClick={() => setIsLoggedIn(false)}
              >
                Sign Out
              </Button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-4 text-[#030F0F]">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="account-name" className="text-[#030F0F]">
                      Full Name
                    </Label>
                    <Input
                      id="account-name"
                      defaultValue="John Smith"
                      className="focus:ring-[#00DF82] focus:border-[#00DF82]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="account-email" className="text-[#030F0F]">
                      Email
                    </Label>
                    <Input
                      id="account-email"
                      defaultValue="john.smith@example.com"
                      className="focus:ring-[#00DF82] focus:border-[#00DF82]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="account-phone" className="text-[#030F0F]">
                      Phone
                    </Label>
                    <Input
                      id="account-phone"
                      defaultValue="(123) 456-7890"
                      className="focus:ring-[#00DF82] focus:border-[#00DF82]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4 text-[#030F0F]">Health Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="health-conditions" className="text-[#030F0F]">
                      Current Health Conditions
                    </Label>
                    <Input
                      id="health-conditions"
                      defaultValue="Back Pain, Insomnia"
                      className="focus:ring-[#00DF82] focus:border-[#00DF82]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="yoga-experience" className="text-[#030F0F]">
                      Yoga Experience Level
                    </Label>
                    <select
                      id="yoga-experience"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00DF82] focus:border-[#00DF82]"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4 text-[#030F0F]">Saved Yoga Routines</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-[#03624C]/20 rounded-md">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-[#030F0F]">Morning Back Pain Relief</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#03624C] text-[#03624C] hover:bg-[#03624C] hover:text-white"
                      >
                        View
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">3 poses • 15 minutes</p>
                  </div>

                  <div className="p-4 border border-[#03624C]/20 rounded-md">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-[#030F0F]">Evening Relaxation</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#03624C] text-[#03624C] hover:bg-[#03624C] hover:text-white"
                      >
                        View
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">5 poses • 20 minutes</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="bg-[#00DF82] hover:bg-[#03624C] text-[#030F0F] hover:text-white">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
