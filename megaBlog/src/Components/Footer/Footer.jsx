import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-100 border-t border-gray-300">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col justify-between">
            <div className="mb-4">
              <Logo width="100px" />
            </div>
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} All Rights Reserved by DevUI.
            </p>
          </div>

          {[
            { title: 'Company', links: ['Features', 'Pricing', 'Affiliate Program', 'Press Kit'] },
            { title: 'Support', links: ['Account', 'Help', 'Contact Us', 'Customer Support'] },
            { title: 'Legals', links: ['Terms & Conditions', 'Privacy Policy', 'Licensing'] }
          ].map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {section.title}
              </h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link} className="mb-3">
                    <Link
                      to="/"
                      className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Footer
