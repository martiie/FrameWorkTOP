"use client"

import type React from "react"
import Layout from "../components/Layout"
import Button from "../components/ui/Button"
import { Card, CardContent } from "../components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs"
// import NotificationPopup from "../components/notification-popup"

// ไอคอน SVG
const GithubIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
)
const InstagramIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
  </svg>
)

// const LinkedinIcon: React.FC = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="h-5 w-5"
//   >
//     <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
//     <rect width="4" height="12" x="2" y="9"></rect>
//     <circle cx="4" cy="4" r="2"></circle>
//   </svg>
// )

const MailIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-primary mt-1"
  >
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
)

const PhoneIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-primary mt-1"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const MapPinIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-primary mt-1"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
)

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  codeUrl: string
}
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
  },
  {
    id: 3,
    title: "ระบบตรวจสอบคุณภาพมะเขือเทศ",
    description:
      "โปรเจกต์ระบบตรวจสอบคุณภาพมะเขือเทศโดยใช้เทคโนโลยี Computer Vision และ Deep Learning สำหรับจำแนกมะเขือเทศว่าสดหรือเน่า เพื่อช่วยเพิ่มประสิทธิภาพในกระบวนการคัดแยกผลผลิตทางการเกษตร",
    image: "/project-3.jpg",
    tags: ["YOLO", "OpenCV", "Deep Learning", "Computer Vision"],
    demoUrl: "/TomatoDetect",
    codeUrl: "#",
  },
]

// Skill data organized by category
const skillsData = {
  "TECHNIQUES&METHODS": [
    "Model Deployment",
    "Exploratory Data Analysis (EDA)",
    "Time Series Forecasting",
    "Feature Engineering",
    "Computer Vision",
    "Image Detection (YOLO)",
    "Natural Language Processing (NLP)",
    "Sentiment Analysis",
    "Regression",
    "Classification",
    "Clustering",
    "ETL / ELT",
    "Model Evaluation & Tuning",
    "Natural Language Processing (NLP)",
    "Chatbot Development (LLM)"
  ],
  "TOOLS&SOFTWARE": [
    "TensorFlow / PyTorch",
    "Jupyter Notebook",
    "Visual Studio Code",
    "Power BI",
    "Apache Airflow",
    "Docker",
    "YOLO",
    "Git",
    "Hugging Face",
    "FastAPI (API Development)",
    "PostgreSQL",
    "Excel"
  ],
  PROGRAMMING_LANGUAGES: ["Python", "R", "SQL", "JavaScript"],
}

const Home: React.FC = () => {
  return (
    <Layout>
      {/* <NotificationPopup
        title="แจ้งให้ทราบ"
        message="เนื่องจากเบอร์โทรศัพท์ 088-264-6971 มีปัญหาในการรับสาย สามารถติดต่อฉันได้ที่เบอร์ 062-462-1742 หรือทาง LINE
        ID: 0623173042"
        type="info"
        showDontShowAgain={true}
        autoShow={true}
        delay={1000}
      /> */}
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section id="hero" className="py-12 md:py-24 lg:py-32 flex flex-col items-center text-center">
          <div className="relative w-40 h-40 mb-8 rounded-full overflow-hidden border-4 border-primary">
            <img src="/top02.png" alt="โปรไฟล์" className="w-full h-40 object-cover" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            สวัสดีครับ ผมชื่อ <span className="text-primary">พิทักษ์ วางโต</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-[700px]">
            data scientist / ML Engineer / data analyst / data engineer
          </p>
          <div className="flex gap-4">
            <Button variant="outline">
              <a href="/Resume">Resume</a>
            </Button>
            <Button variant="outline">
              <a href="/projects">ดูผลงาน</a>
            </Button>
            <Button variant="outline">
              <a href="/contact">ติดต่อฉัน</a>
            </Button>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="py-12 md:py-24 border-t">
          <h2 className="text-3xl font-bold mb-8 text-center">เกี่ยวกับฉัน</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex items-center justify-center">
              <img src="/TOP.png" alt="รูปของฉัน" className="w-80 h-auto rounded-lg object-cover" />
            </div>
            <div className="space-y-4">
              <p className="text-lg">
                สวัสดีครับ ผมชื่อ พิทักษ์ วางโต (TOP) เป็นนักศึกษาจบใหม่จากมหาวิทยาลัยเชียงใหม่ สาขาวิทยาการข้อมูล
                ผมมีประสบการณ์จากโครงการที่เกี่ยวข้องกับการเรียนรู้ของเครื่องจักร การวิเคราะห์ข้อมูล และการพัฒนาข้อมูลไปป์ไลน์
                มีความกระตือรือร้นในการแก้ปัญหาข้อมูลต่างๆ และการสร้างโซลูชันที่ใช้งานได้จริง ทุ่มเทให้กับการเรียนรู้เพื่อพัฒนาความสามารถทางเทคนิค
                และประสบความสำเร็จในสภาพแวดล้อมการทำงานร่วมกัน มีความกระตือรือร้นที่จะนำความรู้ไปใช้กับแอปพลิเคชันในโลกแห่งความเป็นจริง
                และมีส่วนสนับสนุนทีมที่ให้ความสำคัญกับนวัตกรรมและการคิดที่เน้นผู้ใช้ นอกจากการทำงาน ฉันยังชอบการฟังเล่น ดีดกีตาร์ เล่นเกม
                และเนื่องจากยังไม่แข็งแรงด้านภาษาจึงมีการแบ่งเวลาเพื่อเรียนรู้ภาษาอังกฤษด้วย
              </p>
              <div className="flex gap-4 pt-4">
                <Button variant="outline" size="icon">
                  <a href="https://github.com/martiie" target="_blank" rel="noreferrer">
                    <GithubIcon />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon">
                  <a href="https://www.instagram.com/pot_kahtihp" target="_blank" rel="noreferrer">
                    <InstagramIcon />
                    <span className="sr-only">Instagram</span>
                  </a>
                </Button>
                <Button variant="outline" size="icon">
                  <a href="mailto:phithakwangto@gmail.com">
                    <MailIcon />
                    <span className="sr-only">Email</span>
                  </a>
                </Button>
              </div>
              <div className="pt-4">
                <Button variant="outline">
                  <a href="/about">อ่านเพิ่มเติมเกี่ยวกับฉัน</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section - Improved for mobile */}
        <section id="skills" className="py-12 md:py-24 border-t">
          <h2 className="text-3xl font-bold mb-8 text-center">ทักษะและความสามารถ</h2>
          <Tabs defaultValue="TECHNIQUES&METHODS" className="w-full max-w-3xl mx-auto">
            <TabsList className="flex flex-col sm:grid sm:grid-cols-3 w-full gap-2 sm:gap-0 h-auto">
              <TabsTrigger value="TECHNIQUES&METHODS" className="text-xs sm:text-sm py-3 px-2">
                TECHNIQUES & METHODS
              </TabsTrigger>
              <TabsTrigger value="TOOLS&SOFTWARE" className="text-xs sm:text-sm py-3 px-2">
                TOOLS AND SOFTWARE
              </TabsTrigger>
              <TabsTrigger value="PROGRAMMING_LANGUAGES" className="text-xs sm:text-sm py-3 px-2">
                PROGRAMMING LANGUAGES
              </TabsTrigger>
            </TabsList>

            {Object.entries(skillsData).map(([category, skills]) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Card
                      key={skill}
                      className="flex-grow basis-[calc(50%-0.5rem)] sm:basis-[calc(33.333%-0.5rem)] md:basis-[calc(25%-0.5rem)]"
                    >
                      <CardContent className="p-3 sm:p-4 flex items-center justify-center h-full text-center">
                        <p className="text-sm sm:text-base">{skill}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="flex justify-center mt-8">
            <Button variant="outline">
              <a href="/skills">ดูทักษะทั้งหมด</a>
            </Button>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">ผลงานของฉัน</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={`ภาพโปรเจกต์ ${project.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <a href={project.demoUrl}>รายละเอียด</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button>
              <a href="/projects">ดูผลงานทั้งหมด</a>
            </Button>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 border-t bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">ติดต่อฉัน</h2>

            <div className="space-y-8 text-gray-700">
              {/* Email, Address, Phone: แสดงแนวนอนเฉพาะหน้าจอ md ขึ้นไป */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-12">
                <div className="flex items-start gap-3">
                  <MailIcon />
                  <p>phithakwangto@gmail.com</p>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneIcon />
                  <p>088-264-6971</p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon />
                  <p>100 หมู่ 1 ต.หัวเมือง อ.เมืองปาน จ.ลำปาง 52240</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4 pt-2">
                <a
                  href="https://github.com/martiie"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition"
                >
                  <Button variant="outline" size="icon" className="rounded-full">
                    <GithubIcon />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </a>
                <a
                  href="https://www.instagram.com/pot_kahtihp"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition"
                >
                  <Button variant="outline" size="icon" className="rounded-full">
                    <InstagramIcon />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 md:py-24 border-t">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">พร้อมที่จะร่วมงานกับฉัน?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              ฉันพร้อมที่จะช่วยให้โปรเจคของคุณประสบความสำเร็จด้วยทักษะและประสบการณ์ของฉัน
            </p>
            <Button size="lg">
              <a href="/contact">ติดต่อฉันเลย</a>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default Home
