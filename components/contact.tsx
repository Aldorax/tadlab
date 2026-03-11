"use client"

import type React from "react"

import { useState } from "react"

type ContactSectionProps = {
  content: {
    heading: string
    generalTitle: string
    generalEmail: string
    emailTitle: string
    emailValue: string
    phoneTitle: string
    phoneValue: string
    submitLabel: string
    bottomImage: string
  }
}

export default function ContactSection({ content }: ContactSectionProps) {
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
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 grid gap-10 md:grid-cols-2 md:gap-12 lg:mb-16 lg:gap-24">
          {/* Left Column - Heading and Contact Info */}
          <div>
            <h2 className="mb-8 text-3xl font-bold leading-tight text-[#1a1a1a] sm:text-4xl md:mb-12 md:text-5xl">
              {content.heading.split("\n").map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">{content.generalTitle}</h3>
                <a href={`mailto:${content.generalEmail}`} className="text-[#767676] hover:text-[#1a1a1a] transition-colors">
                  {content.generalEmail}
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">{content.emailTitle}</h3>
                <a href={`mailto:${content.emailValue}`} className="text-[#767676] hover:text-[#1a1a1a] transition-colors">
                  {content.emailValue}
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">{content.phoneTitle}</h3>
                <a href={`tel:${content.phoneValue}`} className="text-[#767676] hover:text-[#1a1a1a] transition-colors">
                  {content.phoneValue}
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
                {content.submitLabel}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Image */}
        <div className="w-full">
          <img
            src={content.bottomImage || "/images/elephants.jpg"}
            alt={content.heading}
            className="h-[260px] w-full object-cover sm:h-[360px] md:h-[500px]"
          />
        </div>
      </div>
    </section>
  )
}
