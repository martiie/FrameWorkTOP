"use client"

import type React from "react"
import { useState } from "react"
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
  title: "ระบบตรวจจับและจำแนกมะเขือเทศสดและเน่า",
  description: "ระบบตรวจสอบคุณภาพมะเขือเทศด้วย AI เพื่อจำแนกมะเขือเทศสดและเน่า",
  longDescription:
    "โปรเจกต์นี้พัฒนาระบบตรวจสอบคุณภาพมะเขือเทศโดยใช้เทคโนโลยี Computer Vision และ Deep Learning เพื่อจำแนกมะเขือเทศว่าสดหรือเน่าอย่างแม่นยำ ด้วยโมเดล YOLO (You Only Look Once) ที่มีประสิทธิภาพสูงในการตรวจจับวัตถุแบบเรียลไทม์ ระบบสามารถประมวลผลภาพถ่ายมะเขือเทศจากกล้องหลายมุม เพื่อคัดแยกผลผลิตอย่างรวดเร็วและแม่นยำ ลดความผิดพลาดจากการคัดแยกด้วยตาเปล่า นอกจากนี้ยังมีการนำเทคนิค Data Augmentation มาใช้เพิ่มความหลากหลายของข้อมูลภาพในการฝึกสอนโมเดล เพื่อเพิ่มความทนทานต่อสภาพแสงและมุมมองต่าง ๆ ของภาพที่นำเข้ามา ประกอบกับการสร้าง REST API ด้วย FastAPI ช่วยให้ระบบสามารถให้บริการตรวจจับและจำแนกผลสด-เน่าได้อย่างรวดเร็วและเสถียร พร้อมมี UI ที่พัฒนาด้วย React เพื่อให้ผู้ใช้สามารถดูผลการตรวจจับในรูปแบบกราฟิก พร้อมกรอบล้อมรอบวัตถุ (Bounding Box) และค่าความเชื่อมั่น (Confidence Score) ที่ช่วยให้ผู้ใช้มั่นใจในผลลัพธ์มากยิ่งขึ้น",
  image: "/project-3.jpg",
  gallery: ["/project3/tomato01.jpg", "/project3/tomato02.jpg", "/project3/tomato03.jpg", "/project3/tomato04.jpg", "/project3/tomato05.jpg", "/project3/tomato06.jpg"],
  tags: ["Computer Vision", "Deep Learning", "Object Detection", "Agriculture", "Quality Control"],
  technologies: ["Python", "FastAPI", "YOLO", "OpenCV", "Computer Vision", "Pytorch"],
  features: [
    "จำแนกมะเขือเทศสดและเน่าอย่างแม่นยำด้วยโมเดล YOLO",
    "แสดงผลลัพธ์ด้วยกรอบล้อมรอบวัตถุ (Bounding Box)",
    "แสดงค่าความเชื่อมั่น (Confidence Score) ของการจำแนก"
  ],
  challenges:
    "การรวบรวมและจัดเตรียมข้อมูลภาพมะเขือเทศที่หลากหลายเพียงพอเพื่อฝึกสอนโมเดล รวมถึงการจัดการกับภาพที่มีแสงและมุมมองต่างกัน การปรับแต่งพารามิเตอร์ของโมเดล YOLO ให้เหมาะสมกับงานตรวจจับมะเขือเทศโดยเฉพาะ และการทำให้ระบบรองรับการประมวลผลแบบเรียลไทม์ได้",
  solutions:
    "ใช้เทคนิค Data Augmentation เพื่อเพิ่มความหลากหลายของข้อมูลภาพ เช่น การหมุนภาพ การเปลี่ยนแสง และการครอบตัดภาพ ปรับแต่งโมเดล YOLO ด้วยการปรับ learning rate และ batch size เพื่อเพิ่มความแม่นยำในการตรวจจับ ใช้ OpenCV ช่วยประมวลผลภาพ และสร้าง REST API ด้วย FastAPI เพื่อให้บริการตรวจจับแบบเรียลไทม์ พร้อมพัฒนา UI ด้วย React เพื่อให้ผู้ใช้สามารถใช้งานและดูผลลัพธ์ได้สะดวก",
  demoUrl: "/TreatmentOutcomePage",
  codeUrl: "#",
};




const TomatoDetect: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setResultImage(null)
    }
  }

  const handleSubmit = async () => {
    if (!selectedImage) return

    setLoading(true)
    setError("")
    setResultImage(null)

    const formData = new FormData()
    formData.append("file", selectedImage)

    try {
      const response = await fetch("https://640510702phithak-martiie.hf.space/detect-potato/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Server error")

      // Since the API returns an image, we need to create a blob URL
      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      setResultImage(imageUrl)
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับ API")
      console.error(err)
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
              src={project.image || "/placeholder.svg"}
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
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center">รูปภาพตัวอย่าง</h2>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {project.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative group"
                    draggable="true"
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", image)
                      const img = new Image()
                      img.src = image
                      e.dataTransfer.setDragImage(img, 50, 50)
                    }}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${project.title} - รูปที่ ${index + 1}`}
                      className="w-32 h-32 rounded-lg object-cover cursor-grab transition-all duration-200 group-hover:opacity-90 border-2 border-transparent hover:border-primary"
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 text-center">ลากรูปตัวอย่างไปวางในช่องอัปโหลดด้านล่าง</p>
            </div>


            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">ทดลองใช้งาน ตรวจสอบมะเขือเทศ</h2>
              <div className="space-y-4">
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center transition-colors duration-200 hover:border-primary"
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    e.currentTarget.classList.add("border-primary", "bg-primary/5")
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    e.currentTarget.classList.remove("border-primary", "bg-primary/5")
                  }}
                  onDrop={async (e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    e.currentTarget.classList.remove("border-primary", "bg-primary/5")

                    // Handle file drop
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      const file = e.dataTransfer.files[0]
                      setSelectedImage(file)
                      setPreviewUrl(URL.createObjectURL(file))
                      setResultImage(null)
                      return
                    }

                    // Handle example image drop
                    const imageUrl = e.dataTransfer.getData("text/plain")
                    if (imageUrl && project.gallery.includes(imageUrl)) {
                      setLoading(true)
                      setError("")
                      setResultImage(null)

                      try {
                        // Fetch the example image
                        const response = await fetch(imageUrl)
                        if (!response.ok) throw new Error("Failed to fetch example image")

                        const blob = await response.blob()

                        // Create a File object from the blob
                        const file = new File([blob], `example-${Date.now()}.jpg`, { type: blob.type })

                        // Set the selected image and preview
                        setSelectedImage(file)
                        setPreviewUrl(URL.createObjectURL(blob))

                        // Submit the image for prediction
                        const formData = new FormData()
                        formData.append("file", file)

                        const predictionResponse = await fetch("https://640510702phithak-martiie.hf.space/predict/", {
                          method: "POST",
                          body: formData,
                        })

                        if (!predictionResponse.ok) throw new Error("Server error")

                        // Process the result
                        const resultBlob = await predictionResponse.blob()
                        const resultUrl = URL.createObjectURL(resultBlob)
                        setResultImage(resultUrl)
                      } catch (err) {
                        setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับ API")
                        console.error(err)
                      } finally {
                        setLoading(false)
                      }
                    }
                  }}
                >
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer block w-full text-center">
                    {previewUrl ? (
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="mx-auto max-h-48 object-contain mb-2"
                      />
                    ) : (
                      <div className="py-8">
                        <p className="text-gray-500">ลากรูปตัวอย่างด้านบนหรือรูปของคุณมาวางที่นี่</p>
                        <p className="text-xs text-gray-400 mt-1">หรือคลิกเพื่อเลือกไฟล์ (รองรับไฟล์ JPG, PNG)</p>
                      </div>
                    )}
                  </label>
                </div>

                <Button onClick={handleSubmit} disabled={loading || !selectedImage} className="w-full">
                  {loading ? "กำลังวิเคราะห์..." : <Button variant="outline">
                                                ตรวจสอบมะเขือเทศ
                                            </Button>}
                </Button>

                {resultImage && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">ผลการวิเคราะห์:</h3>
                    <img src={resultImage || "/placeholder.svg"} alt="Result" className="w-full rounded-lg border" />
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
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TomatoDetect
