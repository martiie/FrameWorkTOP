import type React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex gap-6">
          <a href="/" className="text-sm font-medium hover:underline underline-offset-4">
            หน้าหลัก
          </a>
          <a href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            เกี่ยวกับฉัน
          </a>
          <a href="/projects" className="text-sm font-medium hover:underline underline-offset-4">
            ผลงาน
          </a>
          <a href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
            ติดต่อ
          </a>
        </div>
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} พิทักษ์ วางโต. สงวนลิขสิทธิ์ทั้งหมด.</p>
        <p className="text-sm text-muted-foreground">
          สร้างด้วย <span className="text-primary">❤️</span> โดยใช้ React และ Tailwind CSS
        </p>
      </div>
    </footer>
  )
}

export default Footer
