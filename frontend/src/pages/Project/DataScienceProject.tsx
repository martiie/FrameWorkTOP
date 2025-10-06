"use client"

import type React from "react"
import { Link } from "react-router-dom"
import Layout from "../../components/Layout"

interface ButtonProps {
  children: React.ReactNode
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  disabled = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
    "focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 hover:bg-gray-100",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md text-sm",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

// ข้อมูลโปรเจกต์
const project = {
  title: "Data Science Project",
  description:
    "โปรเจกต์รวม 3 ความสามารถ: Web Scraping, Sentiment Analysis และ Chatbot ที่จดจำการสนทนาได้ — เพื่อโชว์ทักษะด้าน Data Science ครบจบในงานเดียว",
  longDescription: `โปรเจกต์นี้ออกแบบมาเพื่อทดสอบและแสดงความสามารถด้าน Data Science โดยรวม 3 โจทย์ไว้ในงานเดียว ได้แก่:

1. Web Scraping: ดึงข้อมูลธุรกิจจากเว็บไซต์ Thailand Yellow Pages และจัดเก็บในรูปแบบ DataFrame พร้อมทำความสะอาดข้อมูลให้อยู่ในรูปแบบวิเคราะห์ได้
2. Sentiment Analysis: วิเคราะห์ความรู้สึกของข้อความ (positive, neutral, negative) ด้วย Machine Learning และ Deep Learning พร้อมประเมินผลด้วย metrics มาตรฐาน
3. Chatbot with Memory: สร้างแชทบอทที่สามารถจดจำบริบทการสนทนา 3 ครั้งล่าสุด โดยใช้ LLM และเทคนิค memory buffer

ทุกขั้นตอนถูกออกแบบให้ใช้งานได้จริง ทั้งในเชิงเทคนิคและการนำเสนอผล`,
  features: [
    "Scrape ข้อมูลธุรกิจจาก YellowPages พร้อมแปลงเป็น DataFrame",
    "วิเคราะห์ Sentiment ด้วย ML / DL หรือ Pre-trained Model",
    "พัฒนา Chatbot ที่จดจำการสนทนา 3 รอบล่าสุดได้",
    "วัดผลด้วย Accuracy, Precision, Recall, F1-score และ Confusion Matrix",
  ],
  technologies: [
    "Python",
    "Pandas",
    "Scikit-learn",
    "BeautifulSoup",
    "Transformers",
    "LangChain",
  ],
  challenges:
    "การจัดการโครงสร้าง DOM ซับซ้อนของเว็บไซต์, การเตรียมข้อมูลให้อยู่ในรูปแบบเหมาะสมกับการฝึกโมเดล, และการจัดการ memory ใน LLM",
  solutions:
    "ใช้ BeautifulSoup กับ requests สำหรับ scraping, ใช้ Scikit-learn หรือ Huggingface ใน sentiment analysis และใช้ LangChain memory buffer เพื่อสร้าง contextual chatbot",
}

const DataScienceProject: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* ปุ่มกลับ */}
        <div className="mb-8">
          <Button variant="outline" size="sm" className="mb-4">
            <Link to="/projects">← กลับไปยังหน้าผลงาน</Link>
          </Button>

          {/* ชื่อและคำอธิบายสั้น */}
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          {/* <p className="text-lg mb-6 text-gray-800">{project.description}</p> */}

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* คอลัมน์เนื้อหาโปรเจกต์หลัก */}
            <div className="md:col-span-2 space-y-6 text-gray-700">
              {/* รูปโปรเจกต์ */}
              <div className="mb-6">
                <img
                  src="/project-7.png"
                  alt="ภาพประกอบโปรเจกต์ Data Science Project"
                  className="rounded-lg shadow-lg max-h-72 w-full object-cover"
                />
              </div>

              <section>
                <h2 className="text-2xl font-semibold mb-2">รายละเอียดโปรเจค</h2>
                <p className="whitespace-pre-line">{project.longDescription}</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">คุณสมบัติหลัก</h2>
                <ul className="list-disc list-inside space-y-1">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-2">ความท้าทายและวิธีแก้ไข</h2>
                <h3 className="text-xl font-medium mb-1">ความท้าทาย</h3>
                <p className="mb-4">{project.challenges}</p>
                <h3 className="text-xl font-medium mb-1">วิธีแก้ไข</h3>
                <p>{project.solutions}</p>
              </section>
            </div>

            {/* คอลัมน์ข้อมูลโปรเจกต์ด้านข้าง */}
            <div className="space-y-6">
              <section className="border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">ข้อมูลโปรเจค</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Source Code</h3>
                    <a
                      href="https://colab.research.google.com/drive/1F-c6E4619Hjd3tpFgbi51Db0gwO1AxBA?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      โค้ดใน Colab เลยจ้า!
                    </a>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">เทคโนโลยีที่ใช้</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">แหล่งข้อมูล</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>YellowPages.co.th</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DataScienceProject
