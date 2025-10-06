import React, { useState } from "react"
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
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
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

const project = {
  id: 1,
  title: "Sentiment Analysis",
  description: "ระบบวิเคราะห์ความคิดเห็นว่าเป็นเชิงบวกหรือเชิงลบ",
  longDescription:
    "โปรเจกต์นี้เป็นระบบวิเคราะห์ความคิดเห็นจากข้อความของผู้ใช้ โดยใช้เทคนิค Natural Language Processing (NLP) และ Machine Learning เพื่อจำแนกความคิดเห็นว่าเป็นเชิงบวกหรือเชิงลบ รองรับข้อความภาษาไทย เหมาะสำหรับการวิเคราะห์ฟีดแบคจากลูกค้าในแพลตฟอร์มโซเชียลมีเดีย เว็บไซต์รีวิว หรือแบบสอบถามออนไลน์ ระบบประกอบด้วยส่วน frontend ที่พัฒนาโดย React และ Tailwind CSS และ backend ที่ให้บริการผ่าน FastAPI โดยใช้ PyThaiNLP สำหรับการประมวลผลภาษาไทย และ scikit-learn สำหรับการสร้างโมเดลเรียนรู้การจำแนกความรู้สึก ผู้ใช้สามารถป้อนข้อความและรับผลลัพธ์การวิเคราะห์ความรู้สึกได้แบบ real-time พร้อมแสดงผลลัพธ์ในรูปแบบที่เข้าใจง่าย",
  image: "/project-4.png",
  gallery: ["/project-1-1.jpg", "/project-1-2.jpg", "/project-1-3.jpg"],
  tags: ["NLP", "Machine Learning", "Sentiment"],
  technologies: ["Python", "FastAPI", "PyThaiNLP", "scikit-learn", "React", "Tailwind CSS"],
  features: [
    "จำแนกความคิดเห็นว่าเป็นเชิงบวกหรือเชิงลบโดยอัตโนมัติ",
    "รองรับการประมวลผลข้อความภาษาไทยด้วย PyThaiNLP",
    "อินเตอร์เฟสผู้ใช้ใช้งานง่ายด้วย React และ Tailwind CSS"
  ],
  challenges:
    "ภาษาไทยมีความซับซ้อนในการตัดคำและมีโครงสร้างประโยคที่ไม่ตายตัว ทำให้การประมวลผลและจำแนกความคิดเห็นเป็นเรื่องท้าทาย นอกจากนี้ การหา dataset ที่เหมาะสมและครอบคลุมก็เป็นอีกหนึ่งอุปสรรค รวมถึงการออกแบบ UI ให้เหมาะกับผู้ใช้ทั่วไป",
  solutions:
    "ใช้ PyThaiNLP สำหรับการตัดคำในภาษาไทย รวบรวมและทำความสะอาด dataset ด้วยตนเอง เพื่อให้ครอบคลุมรูปแบบภาษาที่หลากหลาย ใช้ scikit-learn ในการฝึกโมเดล Logistic Regression และปรับจูนด้วย Cross Validation ใช้ FastAPI เพื่อสร้าง REST API ที่มีประสิทธิภาพและตอบสนองไว พร้อมออกแบบ UI ให้ใช้งานได้ง่ายและดูทันสมัยด้วย Tailwind CSS",
  demoUrl: "/sentiment",
  codeUrl: "#",
}


const ProjectDetail: React.FC = () => {
  const [inputText, setInputText] = useState("")
  const [result, setResult] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    setLoading(true)
    setResult(null)
    setError("")

    try {
      const response = await fetch("https://640510702phithak-martiie.hf.space/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      })
      console.log(response);

      if (!response.ok) throw new Error("Server error")

      const data = await response.json()
      setResult(data.sentiment)
    } catch {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับ API");
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="outline" size="sm">
            <Link to="/projects">← กลับไปยังหน้าผลงาน</Link>
          </Button>
        </div>

        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <img
              src={project.image}
              alt={project.title}
              className="w-80 h-auto rounded-lg object-cover mb-6 mx-auto"
            />
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">รายละเอียดโปรเจค</h2>
                <p className="text-lg">{project.longDescription}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2">คุณสมบัติหลัก</h2>
                <ul className="list-disc list-inside space-y-1">
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-2">ความท้าทายและวิธีแก้ไข</h2>
                <h3 className="text-xl font-medium mb-1">ความท้าทาย</h3>
                <p className="mb-4">{project.challenges}</p>
                <h3 className="text-xl font-medium mb-1">วิธีแก้ไข</h3>
                <p>{project.solutions}</p>
              </div>
            </div>
          </div>


          <div className="space-y-8">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">ทดลองใช้งาน รีวิวสินค้า</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="พิมพ์ข้อความรีวิวสินค้าเพื่อวิเคราะห์ความรู้สึก..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />

                <Button onClick={handleSubmit} disabled={loading || !inputText}>
                  {loading ? "กำลังวิเคราะห์..." : <Button variant="outline">
                                                วิเคราะห์
                                            </Button>}
                </Button>

                {result && (
                  <div className="text-lg font-semibold">
                    ผลลัพธ์:{" "}
                    <span
                      className={
                        result === "positive"
                          ? "text-green-600"
                          : result === "neutral"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }
                    >
                      {result === "positive"
                        ? "เชิงบวก"
                        : result === "neutral"
                          ? "เป็นกลาง"
                          : "เชิงลบ"}
                    </span>
                  </div>
                )}

                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">ข้อมูลโปรเจค</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">เทคโนโลยีที่ใช้</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
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
            </div>

            {/* <div>
              <h2 className="text-xl font-semibold mb-4">รูปภาพเพิ่มเติม</h2>
              <div className="space-y-4">
                {project.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} - รูปที่ ${index + 1}`}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProjectDetail
