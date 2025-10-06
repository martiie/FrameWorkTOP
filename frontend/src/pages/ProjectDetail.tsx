import React from "react"
import { useParams, Link } from "react-router-dom"
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
  longDescription: string
  image: string
  gallery: string[]
  tags: string[]
  technologies: string[]
  features: string[]
  challenges: string
  solutions: string
  demoUrl: string
  codeUrl: string
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  
  // ข้อมูลโปรเจคจำลอง (ในโปรเจคจริงควรดึงข้อมูลจาก API หรือฐานข้อมูล)
  const projects: Project[] = [
    {
      id: 1,
      title: "โปรเจค 1",
      description: "คำอธิบายสั้นๆ เกี่ยวกับโปรเจคนี้",
      longDescription:
        "คำอธิบายโดยละเอียดเกี่ยวกับโปรเจคนี้ วัตถุประสงค์ของโปรเจค กลุ่มเป้าหมาย และผลลัพธ์ที่ได้ คำอธิบายโดยละเอียดเกี่ยวกับโปรเจคนี้ วัตถุประสงค์ของโปรเจค กลุ่มเป้าหมาย และผลลัพธ์ที่ได้ คำอธิบายโดยละเอียดเกี่ยวกับโปรเจคนี้ วัตถุประสงค์ของโปรเจค กลุ่มเป้าหมาย และผลลัพธ์ที่ได้",
      image: "/project-1.jpg",
      gallery: ["/project-1-1.jpg", "/project-1-2.jpg", "/project-1-3.jpg"],
      tags: ["React", "TypeScript", "Tailwind CSS"],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Redux", "Node.js", "Express", "MongoDB"],
      features: [
        "การสมัครสมาชิกและเข้าสู่ระบบ",
        "การค้นหาและกรองข้อมูล",
        "การแสดงผลข้อมูลในรูปแบบตาราง",
        "การแสดงผลข้อมูลในรูปแบบกราฟ",
        "การส่งออกข้อมูลในรูปแบบ CSV และ PDF",
      ],
      challenges:
        "ความท้าทายที่พบในโปรเจคนี้คือการจัดการข้อมูลจำนวนมากและการแสดงผลข้อมูลในรูปแบบที่เข้าใจง่าย รวมถึงการทำให้เว็บไซต์ตอบสนองได้รวดเร็วแม้จะมีข้อมูลจำนวนมาก",
      solutions:
        "ฉันได้แก้ไขปัญหาโดยการใช้เทคนิคการแบ่งหน้าข้อมูล (Pagination) และการโหลดข้อมูลแบบ Lazy Loading รวมถึงการใช้ Redux เพื่อจัดการ state ของแอปพลิเคชัน และการใช้ Memoization เพื่อเพิ่มประสิทธิภาพ",
      demoUrl: "#",
      codeUrl: "#",
    },
    // เพิ่มโปรเจคอื่นๆ ตามต้องการ
  ]

  const project = projects.find((p) => p.id === Number(id))

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">ไม่พบโปรเจค</h1>
          <p className="text-lg mb-8">ไม่พบโปรเจคที่คุณกำลังค้นหา</p>
          <Button>
            <Link to="/projects">กลับไปยังหน้าผลงาน</Link>
          </Button>
        </div>
      </Layout>
    )
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
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-auto rounded-lg object-cover mb-6" />
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
              <h2 className="text-xl font-semibold mb-4">ข้อมูลโปรเจค</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">เทคโนโลยีที่ใช้</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium">ลิงก์</h3>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <a href={project.demoUrl} target="_blank" rel="noreferrer">
                        ดูเว็บไซต์
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <a href={project.codeUrl} target="_blank" rel="noreferrer">
                        ดูโค้ด
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">รูปภาพเพิ่มเติม</h2>
              <div className="space-y-4">
                {project.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} - รูปที่ ${index + 1}`}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-4">โปรเจคที่เกี่ยวข้อง</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((p) => (
                <div key={p.id} className="border rounded-lg overflow-hidden bg-card">
                  <div className="aspect-video relative">
                    <img src={p.image || "/placeholder.svg"} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                    <Button variant="outline" size="sm" className="w-full">
                      <Link to={`/projects/${p.id}`}>ดูรายละเอียด</Link>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProjectDetail
