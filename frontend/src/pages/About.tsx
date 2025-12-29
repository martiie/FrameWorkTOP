import React from "react"
import Layout from "../components/Layout"
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
            <h2 className="text-2xl font-semibold mb-4">หฟเำไพืเดไเำ</h2>
            <p className="text-lg">
              ดฟเำ้พำ่ะพ้เห้ทด
            </p>
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
                  ้พำ่ะหทัก้ำห
                </p>
                <p className="mt-2">
                  หะ่พะ่ห่
                </p>
              </div>
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
              ำไเภ-้ถ้พำด้
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default About
