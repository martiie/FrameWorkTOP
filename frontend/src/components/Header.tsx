"use client"

import type React from "react"
import { useState } from "react"

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background backdrop-blur">
      <div className="flex h-16 items-center justify-between">
        <div className="font-bold text-xl ml-8">
          <a href="/">พิทักษ์ วางโต</a>
        </div>
        <nav className="hidden md:flex gap-8 mr-8">
          <a href="/" className="text-sm font-medium hover:underline underline-offset-4">
            หน้าหลัก
          </a>
          <a href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            เกี่ยวกับฉัน
          </a>
          <a href="/skills" className="text-sm font-medium hover:underline underline-offset-4">
            ทักษะ
          </a>
          <a href="/projects" className="text-sm font-medium hover:underline underline-offset-4">
            ผลงาน
          </a>
          <a href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
            ติดต่อ
          </a>
        </nav>
       

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 right-4 w-56 rounded-md border bg-white text-black shadow-lg md:hidden animate-in slide-in-from-top-5 duration-200">
            <div className="py-2 px-3">
              <a
                href="/"
                className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                หน้าหลัก
              </a>
              <a
                href="/about"
                className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                เกี่ยวกับฉัน
              </a>
              <a
                href="/skills"
                className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ทักษะ
              </a>
              <a
                href="/projects"
                className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ผลงาน
              </a>
              <a
                href="/contact"
                className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ติดต่อ
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
