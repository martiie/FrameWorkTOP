import React, { useState } from "react"
import Layout from "../components/Layout"

// ประเภทข้อมูลสำหรับ props
interface ButtonProps {
  children: React.ReactNode
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  onClick?: () => void
}

// คอมโพเนนต์ Button อย่างง่าย
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
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
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  codeUrl: string
}

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>("all")

  const projects: Project[] = [
    {
      id: 1,
      title: "HIV Risk Calculator",
      description:
        "เครื่องมือคำนวณความเสี่ยงติดเชื้อ HIV จากกิจกรรมทางเพศประเภทต่างๆ โดยพิจารณาปัจจัยเสี่ยงและวิธีป้องกันหลากหลาย พร้อมระบบ Chatbot อัจฉริยะที่ให้คำแนะนำแบบเรียลไทม์",
      image: "/project-1.jpg",
      tags: ["Mathematics", "Chatbot", "Risk Assessment"],
      demoUrl: "/Beyondpage",
      codeUrl: "#",
    },
    {
      id: 2,
      title: "การทำนายเวลารอดชีวิตของผู้ป่วยมะเร็งตับที่มีภาวะเลือดออก (rHCC)",
      description:
        "ระบบทำนายเวลารอดชีวิตของผู้ป่วยมะเร็งตับชนิดรั่วแตกพร้อมภาวะแทรกซ้อนจากเลือดออก โดยใช้ข้อมูลผลตรวจทางห้องปฏิบัติการเพื่อสร้างโมเดลการทำนาย",
      image: "/project-2.jpg",
      tags: ["Machine Learning", "Regression", "Survival Analysis"],
      demoUrl: "/TreatmentOutcomePage",
      codeUrl: "#",
    }
    ,
    {
      id: 3,
      title: "ระบบตรวจสอบคุณภาพมะเขือเทศ",
      description:
        "โปรเจกต์ระบบตรวจสอบคุณภาพมะเขือเทศโดยใช้เทคโนโลยี Computer Vision และ Deep Learning สำหรับจำแนกมะเขือเทศว่าสดหรือเน่า เพื่อช่วยเพิ่มประสิทธิภาพในกระบวนการคัดแยกผลผลิตทางการเกษตร",
      image: "/project-3.jpg",
      tags: ["YOLO", "OpenCV", "Deep Learning", "Computer Vision"],
      demoUrl: "/TomatoDetect",
      codeUrl: "#",
    }
    ,
    {
      id: 4,
      title: "Sentiment Analysis",
      description:
        "ระบบวิเคราะห์ความคิดเห็นจากผู้ใช้ โดยจำแนกข้อความว่าเป็นเชิงบวกหรือเชิงลบ โดยใช้เทคนิค Natural Language Processing (NLP) และโมเดล Machine Learning เพื่อช่วยวิเคราะห์ความรู้สึกจากข้อความในภาษาไทย",
      image: "/project-4.png",
      tags: ["NLP", "Sentiment", "Machine Learning"],
      demoUrl: "/sentiment",
      codeUrl: "#",
    },
    // {
    //   id: 5,
    //   title: "อัตราแลกเปลี่ยนเงิน (THB/USD)",
    //   description:
    //     "ระบบแสดงข้อมูลอัตราแลกเปลี่ยนเงินบาทต่อดอลลาร์สหรัฐ โดยใช้กระบวนการ ETL เพื่อช่วยให้ผู้ใช้สามารถเข้าใจและวิเคราะห์แนวโน้มได้ง่ายขึ้น",
    //   image: "/project-5.jpg",
    //   tags: ["ETL", "Visualization", "REST API","PostgreSQL"],
    //   demoUrl: "/exchangedashboard",
    //   codeUrl: "#",
    // },
    {
      id: 6, 
      title: "ระบบถามตอบจากเอกสาร (Document QA System)",
      description:
        "ระบบอัปโหลดเอกสารที่รองรับหลายประเภท (.pdf, .docx, .xlsx, .txt) เพื่อให้ผู้ใช้สามารถถามคำถามเกี่ยวกับเนื้อหาในเอกสารได้ โดยใช้เทคโนโลยี FastAPI, FAISS, และ Gemini API สำหรับการประมวลผลและตอบคำถาม",
      image: "/project-6.jpg", 
      tags: ["FastAPI", "FAISS", "Chatbot", "Python", "RAG"], 
      demoUrl: "/ChatbotRAG",
      codeUrl: "#",
    },
    {
      id: 7,
      title: "Data Science Project",
      description: "โปรเจกต์รวม 3 เทคนิคหลัก: Web Scraping ดึงข้อมูลธุรกิจจาก ThaiYellowPages, วิเคราะห์ Sentiment ด้วย Machine Learning และสร้าง Chatbot ที่จดจำการสนทนา 3 ครั้งล่าสุดด้วย LLM",
      image: "/project-7.png",
      tags: ["Python", "Pandas", "LLM", "BeautifulSoup"],
      demoUrl: "/DataScienceProject",  // หากคุณมี route จริงชื่ออื่นให้แก้ตามนั้น
      codeUrl: "https://colab.research.google.com/drive/1F-c6E4619Hjd3tpFgbi51Db0gwO1AxBA?usp=sharing",  // ใส่ลิงก์ GitHub หรือ Colab ได้หากมี
    },

  ]

  // รวบรวม tags ทั้งหมดจากโปรเจค
  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)))

  // กรองโปรเจคตาม tag ที่เลือก
  const filteredProjects =
    filter === "all" ? projects : projects.filter((project) => project.tags.includes(filter))

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">ผลงานของฉัน</h1>

        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-center">
            นี่คือตัวอย่างผลงานที่ฉันได้พัฒนาขึ้น แต่ละโปรเจคแสดงถึงทักษะและความสามารถที่แตกต่างกันไป
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            ทั้งหมด
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={filter === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="border rounded-lg overflow-hidden bg-card">
              <div className="aspect-video relative">
                <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2justify-center">
                  <Button variant="outline" size="sm">
                    <a href={project.demoUrl}>รายละเอียด</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">ไม่พบโปรเจคที่ตรงกับเงื่อนไขการค้นหา</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Projects
