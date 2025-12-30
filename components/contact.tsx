"use client"

import type React from "react"

import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add form submission logic here
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-16">
          {/* Left Column - Heading and Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-12 leading-tight">
              Ready to Collaborate?
              <br />
              Let's connect and Build
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">General Enquiries</h3>
                <a href="mailto:info@africandsl.com" className="text-[#767676] hover:text-[#1a1a1a] transition-colors">
                  info@africandsl.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">Email</h3>
                <a href="mailto:africandsl@gmail.com" className="text-[#767676] hover:text-[#1a1a1a] transition-colors">
                  africandsl@gmail.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">Phonce Number</h3>
                <a href="tel:+971-5070-8100" className="text-[#767676] hover:text-[#1a1a1a] transition-colors">
                  +971-5070-8100
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-b border-[#d1d1d1] text-[#1a1a1a] placeholder:text-[#767676] focus:outline-none focus:border-[#1a1a1a] transition-colors bg-transparent"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-b border-[#d1d1d1] text-[#1a1a1a] placeholder:text-[#767676] focus:outline-none focus:border-[#1a1a1a] transition-colors bg-transparent"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-b border-[#d1d1d1] text-[#1a1a1a] placeholder:text-[#767676] focus:outline-none focus:border-[#1a1a1a] transition-colors bg-transparent"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 border-b border-[#d1d1d1] text-[#1a1a1a] placeholder:text-[#767676] focus:outline-none focus:border-[#1a1a1a] transition-colors bg-transparent"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={1}
                  className="w-full px-0 py-3 border-b border-[#d1d1d1] text-[#1a1a1a] placeholder:text-[#767676] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none bg-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#000000] text-white py-4 px-6 rounded-md hover:bg-[#1a1a1a] transition-colors font-medium mt-8"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Image */}
        <div className="w-full">
          <img
            src="/images/elephants.jpg"
            alt="Elephants walking across African savanna"
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
        </div>
      </div>
    </section>
  )
}
