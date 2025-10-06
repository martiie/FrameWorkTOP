import React from "react"
import Layout from "../components/Layout"

// ประเภทข้อมูลสำหรับ props

// คอมโพเนนต์ Button อย่างง่าย
// const Button: React.FC<ButtonProps> = ({
//   children,
//   variant = "default",
//   size = "default",
//   className = "",
//   onClick,
// }) => {
//   const baseStyles =
//     "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

//   const variants = {
//     default: "bg-primary text-primary-foreground hover:bg-primary/90",
//     outline: "border border-input hover:bg-accent hover:text-accent-foreground",
//   }

//   const sizes = {
//     default: "h-10 py-2 px-4",
//     sm: "h-9 px-3 rounded-md text-sm",
//     lg: "h-11 px-8 rounded-md",
//     icon: "h-10 w-10",
//   }

//   return (
//     <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick}>
//       {children}
//     </button>
//   )
// }

// ไอคอน SVG
// const GithubIcon: React.FC = () => (
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
//     <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
//     <path d="M9 18c-4.51 2-5-2-7-2"></path>
//   </svg>
// )

// const MailIcon: React.FC = () => (
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
//     <rect width="20" height="16" x="2" y="4" rx="2"></rect>
//     <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
//   </svg>
// )

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">เกี่ยวกับฉัน</h1>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          <div className="flex items-center justify-center">
            <img src="/TOP.png" alt="รูปของฉัน" className="w-auto h-80 rounded-lg object-cover" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">พิทักษ์ วางโต</h2>
            <p className="text-lg">
              สวัสดีครับ ผมชื่อ พิทักษ์ วางโต (TOP) เป็นนักศึกษาจบใหม่จากมหาวิทยาลัยเชียงใหม่ สาขาวิทยาการข้อมูล
              ผมมีประสบการณ์จากโครงการที่เกี่ยวข้องกับการเรียนรู้ของเครื่องจักร การวิเคราะห์ข้อมูล และการพัฒนาข้อมูลไปป์ไลน์
              มีความกระตือรือร้นในการแก้ปัญหาข้อมูลต่างๆ และการสร้างโซลูชันที่ใช้งานได้จริง ทุ่มเทให้กับการเรียนรู้เพื่อพัฒนาความสามารถทางเทคนิค
              และประสบความสำเร็จในสภาพแวดล้อมการทำงานร่วมกัน มีความกระตือรือร้นที่จะนำความรู้ไปใช้กับแอปพลิเคชันในโลกแห่งความเป็นจริง
              และมีส่วนสนับสนุนทีมที่ให้ความสำคัญกับนวัตกรรมและการคิดที่เน้นผู้ใช้ นอกจากการทำงาน ฉันยังชอบการฟังเล่น ดีดกีตาร์ เล่นเกม
              และเนื่องจากยังไม่แข็งแรงด้านภาษาจึงมีการแบ่งเวลาเพื่อเรียนรู้ภาษาอังกฤษด้วย
            </p>
            {/* <div className="flex gap-4 pt-4">
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
            </div> */}
          </div>
        </div>

        <div className="space-y-8 mt-12">
          <section>
            <h2 className="text-2xl font-semibold mb-4">ประวัติการศึกษา</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium">ปริญญาตรี สาขา วิทยาการข้อมูล</h3>
                <p className="text-muted-foreground">มหาวิทยาลัยเชียงใหม่ • 2564 - 2568</p>
                <p className="mt-2">
                  วิชาเอก: คณิตศาสตร์   GPA: 3.53 (เกียรตินิยมอันดับหนึ่ง)
                </p>
                <p className="mt-2">
                  ผลงานเด่น:แบบจำลองการทำนายระยะเวลาการรอดชีวิตของผู้ป่วยมะเร็งตับที่มีภาวะเลือดออก (rHCC)
                </p>
              </div>
              {/* <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium">ประกาศนียบัตร [ชื่อหลักสูตร]</h3>
                <p className="text-muted-foreground">[ชื่อสถาบัน] • [ปีที่ได้รับ]</p>
                <p className="mt-2">[รายละเอียดเพิ่มเติมเกี่ยวกับหลักสูตรและทักษะที่ได้รับ]</p>
              </div> */}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">ประสบการณ์การทำงาน</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium">ฝึกงาน ตำแหน่ง ML Engineer</h3>
                <p className="text-muted-foreground">A&E System Management จำกัด • 6 เดือน</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <p>สร้างระบบตรวจจับใบหน้าเพื่อเช็คชื่อเข้างานของพนักงาน โดยมีรายละเอียดดังนี้</p>
                  <li>พัฒนาโมเดล Machine Learning สำหรับจดจำและจำแนกใบหน้าพนักงานโดยใช้ OpenCV และ Deep Learning</li>
                  <li>ออกแบบระบบเช็คชื่อที่สามารถตรวจจับใบหน้าจากกล้องแบบเรียลไทม์และบันทึกข้อมูลลงฐานข้อมูล</li>
                  <li>สร้าง REST API ด้วย FastAPI เพื่อเชื่อมต่อระหว่างโมเดล ML และระบบบันทึกข้อมูล</li>
                  <li>สร้าง Dashboard เพื่อแสดงรายงานการเข้า-ออกงานของพนักงานแต่ละคนแบบอินเตอร์แอคทีฟ</li>
                  <li>ปรับปรุงประสิทธิภาพของโมเดลและลด False Positive ด้วยเทคนิคการปรับพารามิเตอร์และการทำ Data Augmentation</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">ความสนใจส่วนตัว</h2>
            <p className="text-lg">
              นอกจากการทำงาน ผมยังมีความสนใจในเรื่อง การเงิน, การลงทุน และ การท่องเที่ยว
              ผมเชื่อว่าการมีความสนใจที่หลากหลายช่วยให้ผมมีมุมมองที่กว้างขึ้นและสามารถนำแนวคิดใหม่ๆ
              มาประยุกต์ใช้ในการทำงานได้
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default About
