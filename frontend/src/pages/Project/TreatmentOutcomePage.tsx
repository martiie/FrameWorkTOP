"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Layout from "../../components/Layout"
import { Info } from "lucide-react"

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

// Parameter descriptions for tooltips
const paramDescriptions = {
    alb: "ระดับอัลบูมินในเลือด (ค่าปกติ: 3.5-5.0 g/dL) - ตัวชี้วัดการทำงานของตับ",
    hct: "ค่าเม็ดเลือดแดงอัดแน่น (ค่าปกติ: 38-54% ในผู้ชาย, 34-47% ในผู้หญิง)",
    inr: "International Normalized Ratio - ค่าการแข็งตัวของเลือด (ค่าปกติ: 0.8-1.2)",
    tb: "ระดับบิลิรูบินรวม (ค่าปกติ: 0.1-1.2 mg/dL) - ตัวชี้วัดการทำงานของตับ",
    child: "คะแนน Child-Pugh - ระบบคะแนนความรุนแรงของโรคตับ (5-15 คะแนน, 5-6=A, 7-9=B, 10-15=C)",
    bclcstage: "ระยะของมะเร็งตับตามเกณฑ์ Barcelona Clinic Liver Cancer (0-4, 0=ระยะแรกสุด, 4=ระยะสุดท้าย)",
    sex: "เพศของผู้ป่วย",
    treatment: "วิธีการรักษาที่ได้รับ",
    loctumor: "ตำแหน่งของเนื้องอกในตับ",
    locbleed: "ตำแหน่งที่มีเลือดออกในตับ",
    shock: "ภาวะช็อกจากการเสียเลือด",
    hvivcinvade: "การลุกลามของมะเร็งเข้าสู่หลอดเลือดดำตับ (Hepatic Vein) หรือหลอดเลือดดำใหญ่ (Inferior Vena Cava)",
    hepencep: "ภาวะสมองอักเสบจากตับ (Hepatic Encephalopathy) - ภาวะที่สมองทำงานผิดปกติเนื่องจากตับไม่สามารถกำจัดสารพิษได้",
    active: "ภาวะเลือดออกที่ยังไม่หยุด",
    pvinvade: "การลุกลามของมะเร็งเข้าสู่หลอดเลือดดำพอร์ทัล (Portal Vein)",
    ascites: "ภาวะน้ำในช่องท้อง - การสะสมของของเหลวในช่องท้องซึ่งเป็นอาการของโรคตับ",
    sen: "ความไวต่อการรักษา",
}

const project = {
    id: 1,
    title: "การทำนายเวลารอดชีวิตของผู้ป่วยมะเร็งตับที่มีภาวะเลือดออก (rHCC)",
    description: "ระบบทำนายเวลารอดชีวิตของผู้ป่วยมะเร็งตับชนิดรั่วแตกที่มีภาวะแทรกซ้อนจากเลือดออก",
    longDescription:
        "Rupture Hepatocellular Carcinoma (rHCC) เป็นปัญหาสาธารณสุขสำคัญในประเทศไทย โดยเฉพาะเมื่อเกิดภาวะแทรกซ้อนจากเลือดออกซึ่งเพิ่มความเสี่ยงต่อการเสียชีวิตหากไม่ได้รับการรักษาอย่างทันท่วงที ปัจจุบันมีวิธีรักษาหลัก 3 วิธี ได้แก่ การอุดหลอดเลือด (TACE), การผ่าตัด และการรักษาแบบประคับประคอง (Conservative Treatment)\n\n\
    โครงการนี้มุ่งพัฒนาโมเดล Regression เพื่อทำนายระยะเวลาการรอดชีวิตของผู้ป่วย rHCC ที่มีภาวะเลือดออก โดยอาศัยข้อมูลทางคลินิกและผลตรวจทางห้องปฏิบัติการ\n\n\
    กระบวนการวิเคราะห์ข้อมูลรวมถึงการทำความสะอาดข้อมูล จัดการข้อมูลที่ขาดหาย การเลือกคุณลักษณะสำคัญ (Feature Selection) และใช้เทคนิค K-Fold Cross-Validation เพื่อลดอคติในการประเมินผลโมเดล\n\n\
    เพื่อช่วยในการตัดสินใจเลือกแนวทางรักษาที่เหมาะสมแบบเฉพาะบุคคล เพิ่มโอกาสรอดชีวิตให้ผู้ป่วยได้มากขึ้น",
    image: "/project-2.jpg",
    gallery: ["/liver-cancer-1.jpg", "/liver-cancer-2.jpg", "/liver-cancer-3.jpg"],
    tags: ["Healthcare", "Machine Learning", "Regression", "Prediction", "rHCC", "Survival Analysis"],
    technologies: ["Python", "FastAPI", "scikit-learn", "Regression", "GridSearchCV"],
    features: [
        "ทำนายเวลารอดชีวิตของผู้ป่วย rHCC ที่มีภาวะเลือดออก",
        "วิเคราะห์ข้อมูลทางคลินิกและผลตรวจห้องปฏิบัติการ",
        "ใช้เทคนิค Feature Selection และ K-Fold Cross-Validation เพื่อเพิ่มความแม่นยำ",
        "ออกแบบ UI ที่เข้าใจง่ายสำหรับแพทย์และบุคลากรทางการแพทย์"
    ],
    challenges:
        "การรวบรวมข้อมูลผู้ป่วยที่มีภาวะเลือดออกอย่างครบถ้วน, การเลือกตัวแปรสำคัญทางคลินิก, การพัฒนาโมเดลที่แม่นยำและตีความได้ง่ายสำหรับการใช้งานจริง",
    solutions:
        "ใช้ข้อมูลผู้ป่วย rHCC ที่ผ่านการตรวจสอบคุณภาพ, ใช้วิธีเลือกตัวแปรสำคัญและเทคนิค K-Fold Cross-Validation เพื่อพัฒนาโมเดลที่เสถียร พร้อมออกแบบ UI ให้ใช้งานง่ายและเหมาะสมกับบุคลากรทางการแพทย์"
};



interface FormData {
    alb: number
    treat_embolize: number
    treat_surgery: number
    hct: number
    locbleed_left_lobe: number
    shock_No_shock: number
    loctumor_left_lobe: number
    loctumor_right_lobe: number // Added right lobe for tumor location
    sen: number
    sex_male: number
    sex_female: number
    hvivcinvade: number
    hepencep: number
    shock_Shock: number
    locbleed_right_lobe: number
    active: number
    pvinvade: number
    ascites: number
    treat_conservative: number
    inr: number
    tb: number
    child: number
    bclcstage: number
}

// Updated default values based on medical standards
const initialFormData: FormData = {
    alb: 3.8, // Normal albumin level
    treat_embolize: 0,
    treat_surgery: 0,
    hct: 40, // Normal hematocrit
    locbleed_left_lobe: 0,
    shock_No_shock: 1,
    loctumor_left_lobe: 0,
    loctumor_right_lobe: 0, // Added right lobe for tumor location
    sen: 0,
    sex_male: 1,
    sex_female: 0,
    hvivcinvade: 0,
    hepencep: 0,
    shock_Shock: 0,
    locbleed_right_lobe: 0,
    active: 0,
    pvinvade: 0,
    ascites: 0,
    treat_conservative: 1,
    inr: 1.0, // Normal INR
    tb: 0.8, // Normal total bilirubin
    child: 5, // Child-Pugh class A (best prognosis)
    bclcstage: 0, // Early stage
}

// Component for parameter tooltip
const ParameterTooltip: React.FC<{ description: string }> = ({ description }) => {
    const [showTooltip, setShowTooltip] = useState(false)

    return (
        <div className="relative inline-block ml-1">
            <Info
                size={16}
                className="inline text-gray-500 cursor-help"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
                <div className="absolute z-10 w-64 p-2 text-xs bg-black text-white rounded shadow-lg -left-2 -top-2 transform -translate-y-full">
                    {description}
                </div>
            )}
        </div>
    )
}

const ProjectDetail: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [result, setResult] = useState<null | number>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [activeTab, setActiveTab] = useState("basic") // basic, clinical, complications

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? ((e.target as HTMLInputElement).checked ? 1 : 0) : Number.parseFloat(value),
        })
    }

    const handleRadioChange = (name: string, value: number) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    // Fixed gender selection to properly handle radio buttons
    const handleGenderChange = (isMale: boolean) => {
        setFormData({
            ...formData,
            sex_male: isMale ? 1 : 0,
            sex_female: isMale ? 0 : 1,
        })
    }

    // Fixed treatment selection to properly handle radio buttons
    const handleTreatmentChange = (treatment: "conservative" | "embolize" | "surgery") => {
        setFormData({
            ...formData,
            treat_conservative: treatment === "conservative" ? 1 : 0,
            treat_embolize: treatment === "embolize" ? 1 : 0,
            treat_surgery: treatment === "surgery" ? 1 : 0,
        })
    }

    // Fixed shock selection to properly handle radio buttons
    const handleShockChange = (hasShock: boolean) => {
        setFormData({
            ...formData,
            shock_No_shock: hasShock ? 1 : 0,
            shock_Shock: hasShock ? 0 : 1,
        })
    }

    const resetForm = () => {
        setFormData(initialFormData)
        setResult(null)
        setError("")
    }

    const handleSubmit = async () => {
        setLoading(true)
        setResult(null)
        setError("")

        try {
            // Prepare the data for API request
            // Note: We need to exclude loctumor_right_lobe as it's not in the API schema
            const requestData = {
                alb: Number.parseFloat(formData.alb.toString()),
                treat_embolize: Number.parseInt(formData.treat_embolize.toString()),
                treat_surgery: Number.parseInt(formData.treat_surgery.toString()),
                hct: Number.parseFloat(formData.hct.toString()),
                locbleed_left_lobe: Number.parseInt(formData.locbleed_left_lobe.toString()),
                shock_No_shock: Number.parseInt(formData.shock_No_shock.toString()),
                loctumor_left_lobe: Number.parseInt(formData.loctumor_left_lobe.toString()),
                sen: Number.parseInt(formData.sen.toString()),
                sex_male: Number.parseInt(formData.sex_male.toString()),
                sex_female: Number.parseInt(formData.sex_female.toString()),
                hvivcinvade: Number.parseInt(formData.hvivcinvade.toString()),
                hepencep: Number.parseInt(formData.hepencep.toString()),
                shock_Shock: Number.parseInt(formData.shock_Shock.toString()),
                locbleed_right_lobe: Number.parseInt(formData.locbleed_right_lobe.toString()),
                active: Number.parseInt(formData.active.toString()),
                pvinvade: Number.parseInt(formData.pvinvade.toString()),
                ascites: Number.parseInt(formData.ascites.toString()),
                treat_conservative: Number.parseInt(formData.treat_conservative.toString()),
                inr: Number.parseFloat(formData.inr.toString()),
                tb: Number.parseFloat(formData.tb.toString()),
                child: Number.parseInt(formData.child.toString()),
                bclcstage: Number.parseInt(formData.bclcstage.toString()),
            }

            console.log("Sending liver cancer prediction data:", requestData)

            const response = await fetch("https://640510702phithak-martiie.hf.space/predict_survival", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.error("API error:", errorData)
                throw new Error(`Server error: ${errorData.detail || "Unknown error"}`)
            }

            const data = await response.json()
            console.log("Liver cancer prediction response:", data)
            setResult(data.predicted_days)
        } catch (err) {
            console.error("Error:", err)
            setError(`เกิดข้อผิดพลาดในการเชื่อมต่อกับ API: ${err instanceof Error ? err.message : "Unknown error"}`)
        } finally {
            setLoading(false)
        }
    }

    const formatDays = (days: number) => {
        const day = Math.floor(days / 100)
        const years = Math.floor(day / 365)
        const months = Math.floor((day % 365) / 30)
        const remainingDays = Math.floor(day % 30)

        let result = ""
        if (years > 0) result += `${years} ปี `
        if (months > 0) result += `${months} เดือน `
        if (remainingDays > 0) result += `${remainingDays} วัน`

        return result.trim() || "น้อยกว่า 1 วัน"
    }

    // Tab navigation component
    const TabNav = () => (
        <div className="flex border-b mb-4">
            <button
                className={`px-4 py-2 font-medium ${activeTab === "basic" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
                onClick={() => setActiveTab("basic")}
            >
                ข้อมูลพื้นฐาน
            </button>
            <button
                className={`px-4 py-2 font-medium ${activeTab === "clinical" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
                onClick={() => setActiveTab("clinical")}
            >
                ข้อมูลทางคลินิก
            </button>
            <button
                className={`px-4 py-2 font-medium ${activeTab === "complications" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"}`}
                onClick={() => setActiveTab("complications")}
            >
                ภาวะแทรกซ้อน
            </button>
        </div>
    )

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
                    <div className="md:col-span-2 text-center">
                        <img
                            src={project.image || "/placeholder.svg?height=300&width=400"}
                            alt={project.title}
                            className="w-full max-w-md h-auto rounded-lg object-cover mb-6 mx-auto"
                        />
                        <div className="space-y-6 text-left">
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
                        <div className="border rounded-lg p-6 bg-white shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">ทดลองใช้งาน</h2>

                            <TabNav />

                            <div className="space-y-4">
                                {activeTab === "basic" && (
                                    <>
                                        <div className="p-4 bg-blue-50 rounded-md mb-4">
                                            <h3 className="font-medium text-blue-800 mb-2">ข้อมูลพื้นฐานของผู้ป่วย</h3>
                                            <p className="text-sm text-blue-700">กรอกข้อมูลพื้นฐานของผู้ป่วย เช่น เพศ และค่าทางห้องปฏิบัติการที่สำคัญ</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Albumin (g/dL)
                                                    <ParameterTooltip description={paramDescriptions.alb} />
                                                </label>
                                                <input
                                                    type="number"
                                                    name="alb"
                                                    value={formData.alb}
                                                    onChange={handleInputChange}
                                                    step="0.1"
                                                    min="0"
                                                    max="6"
                                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <div className="text-xs text-gray-500 mt-1">ค่าปกติ: 3.5-5.0 g/dL</div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Hematocrit (%)
                                                    <ParameterTooltip description={paramDescriptions.hct} />
                                                </label>
                                                <input
                                                    type="number"
                                                    name="hct"
                                                    value={formData.hct}
                                                    onChange={handleInputChange}
                                                    step="0.1"
                                                    min="0"
                                                    max="60"
                                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <div className="text-xs text-gray-500 mt-1">ค่าปกติ: 38-54% (ชาย), 34-47% (หญิง)</div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    INR
                                                    <ParameterTooltip description={paramDescriptions.inr} />
                                                </label>
                                                <input
                                                    type="number"
                                                    name="inr"
                                                    value={formData.inr}
                                                    onChange={handleInputChange}
                                                    step="0.1"
                                                    min="0.5"
                                                    max="10"
                                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <div className="text-xs text-gray-500 mt-1">ค่าปกติ: 0.8-1.2</div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Total Bilirubin (mg/dL)
                                                    <ParameterTooltip description={paramDescriptions.tb} />
                                                </label>
                                                <input
                                                    type="number"
                                                    name="tb"
                                                    value={formData.tb}
                                                    onChange={handleInputChange}
                                                    step="0.1"
                                                    min="0"
                                                    max="30"
                                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <div className="text-xs text-gray-500 mt-1">ค่าปกติ: 0.1-1.2 mg/dL</div>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium mb-1">
                                                เพศ
                                                <ParameterTooltip description={paramDescriptions.sex} />
                                            </label>
                                            <div className="flex gap-4 mt-1">
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="radio"
                                                        checked={formData.sex_male === 1}
                                                        onChange={() => handleGenderChange(true)}
                                                        className="mr-2"
                                                    />
                                                    <span>ชาย</span>
                                                </label>
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="radio"
                                                        checked={formData.sex_female === 1}
                                                        onChange={() => handleGenderChange(false)}
                                                        className="mr-2"
                                                    />
                                                    <span>หญิง</span>
                                                </label>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === "clinical" && (
                                    <>
                                        <div className="p-4 bg-green-50 rounded-md mb-4">
                                            <h3 className="font-medium text-green-800 mb-2">ข้อมูลทางคลินิก</h3>
                                            <p className="text-sm text-green-700">กรอกข้อมูลเกี่ยวกับความรุนแรงของโรค ระยะของมะเร็ง และการรักษา</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    Child-Pugh Score
                                                    <ParameterTooltip description={paramDescriptions.child} />
                                                </label>
                                                <input
                                                    type="number"
                                                    name="child"
                                                    value={formData.child}
                                                    onChange={handleInputChange}
                                                    min="5"
                                                    max="15"
                                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <div className="text-xs text-gray-500 mt-1">5-6 = A, 7-9 = B, 10-15 = C</div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1">
                                                    BCLC Stage
                                                    <ParameterTooltip description={paramDescriptions.bclcstage} />
                                                </label>
                                                <select
                                                    name="bclcstage"
                                                    value={formData.bclcstage}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option value="0">0 - Very early stage</option>
                                                    <option value="1">A - Early stage</option>
                                                    <option value="2">B - Intermediate stage</option>
                                                    <option value="3">C - Advanced stage</option>
                                                    <option value="4">D - Terminal stage</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium mb-1">
                                                การรักษา
                                                <ParameterTooltip description={paramDescriptions.treatment} />
                                            </label>
                                            <div className="grid grid-cols-3 gap-2 mt-1">
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="radio"
                                                        checked={formData.treat_conservative === 1}
                                                        onChange={() => handleTreatmentChange("conservative")}
                                                        className="mr-2"
                                                    />
                                                    <span>Conservative</span>
                                                </label>
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="radio"
                                                        checked={formData.treat_embolize === 1}
                                                        onChange={() => handleTreatmentChange("embolize")}
                                                        className="mr-2"
                                                    />
                                                    <span>Embolize</span>
                                                </label>
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="radio"
                                                        checked={formData.treat_surgery === 1}
                                                        onChange={() => handleTreatmentChange("surgery")}
                                                        className="mr-2"
                                                    />
                                                    <span>Surgery</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium mb-1">
                                                ตำแหน่งเนื้องอก
                                                <ParameterTooltip description={paramDescriptions.loctumor} />
                                            </label>
                                            <div className="flex gap-4 mt-1">
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.loctumor_left_lobe === 1}
                                                        onChange={(e) => handleRadioChange("loctumor_left_lobe", e.target.checked ? 1 : 0)}
                                                        className="mr-2"
                                                    />
                                                    <span>Left Lobe</span>
                                                </label>
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.loctumor_right_lobe === 1}
                                                        onChange={(e) => handleRadioChange("loctumor_right_lobe", e.target.checked ? 1 : 0)}
                                                        className="mr-2"
                                                    />
                                                    <span>Right Lobe</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium mb-1">
                                                ตำแหน่งเลือดออก
                                                <ParameterTooltip description={paramDescriptions.locbleed} />
                                            </label>
                                            <div className="flex gap-4 mt-1">
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.locbleed_left_lobe === 1}
                                                        onChange={(e) => handleRadioChange("locbleed_left_lobe", e.target.checked ? 1 : 0)}
                                                        className="mr-2"
                                                    />
                                                    <span>Left Lobe</span>
                                                </label>
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.locbleed_right_lobe === 1}
                                                        onChange={(e) => handleRadioChange("locbleed_right_lobe", e.target.checked ? 1 : 0)}
                                                        className="mr-2"
                                                    />
                                                    <span>Right Lobe</span>
                                                </label>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === "complications" && (
                                    <>
                                        <div className="p-4 bg-red-50 rounded-md mb-4">
                                            <h3 className="font-medium text-red-800 mb-2">ภาวะแทรกซ้อน</h3>
                                            <p className="text-sm text-red-700">กรอกข้อมูลเกี่ยวกับภาวะแทรกซ้อนต่างๆ ที่อาจส่งผลต่อการพยากรณ์โรค</p>
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium mb-1">
                                                ภาวะช็อก
                                                <ParameterTooltip description={paramDescriptions.shock} />
                                            </label>
                                            <div className="flex gap-4 mt-1">
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="radio"
                                                        checked={formData.shock_Shock === 1}
                                                        onChange={() => handleShockChange(false)}
                                                        className="mr-2"
                                                    />
                                                    <span>ไม่มีภาวะช็อก</span>
                                                </label>
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="radio"
                                                        checked={formData.shock_No_shock === 1}
                                                        onChange={() => handleShockChange(true)}
                                                        className="mr-2"
                                                    />
                                                    <span>มีภาวะช็อก</span>
                                                </label>

                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium mb-1">ภาวะแทรกซ้อนอื่นๆ</label>
                                            <div className="grid grid-cols-2 gap-2 mt-1">
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.hvivcinvade === 1}
                                                        onChange={(e) => handleRadioChange("hvivcinvade", e.target.checked ? 1 : 0)}
                                                        className="mr-2"
                                                    />
                                                    <span>HV/IVC Invasion</span>
                                                    <ParameterTooltip description={paramDescriptions.hvivcinvade} />
                                                </label>
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.hepencep === 1}
                                                        onChange={(e) => handleRadioChange("hepencep", e.target.checked ? 1 : 0)}
                                                        className="mr-2"
                                                    />
                                                    <span>Hepatic Encephalopathy</span>
                                                    <ParameterTooltip description={paramDescriptions.hepencep} />
                                                </label>
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.active === 1}
                                                        onChange={(e) => handleRadioChange("active", e.target.checked ? 1 : 0)}
                                                        className="mr-2"
                                                    />
                                                    <span>Active Bleeding</span>
                                                    <ParameterTooltip description={paramDescriptions.active} />
                                                </label>
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.pvinvade === 1}
                                                        onChange={(e) => handleRadioChange("pvinvade", e.target.checked ? 1 : 0)}
                                                        className="mr-2"
                                                    />
                                                    <span>Portal Vein Invasion</span>
                                                    <ParameterTooltip description={paramDescriptions.pvinvade} />
                                                </label>
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.ascites === 1}
                                                        onChange={(e) => handleRadioChange("ascites", e.target.checked ? 1 : 0)}
                                                        className="mr-2"
                                                    />
                                                    <span>Ascites</span>
                                                    <ParameterTooltip description={paramDescriptions.ascites} />
                                                </label>
                                                <label className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.sen === 1}
                                                        onChange={(e) => handleRadioChange("sen", e.target.checked ? 1 : 0)}
                                                        className="mr-2"
                                                    />
                                                    <span>Sensitivity</span>
                                                    <ParameterTooltip description={paramDescriptions.sen} />
                                                </label>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="flex gap-2 mt-6">
                                    <Button onClick={handleSubmit} disabled={loading} className="flex-1">
                                        {loading ? (
                                            <span className="flex items-center justify-center">
                                                <svg
                                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                กำลังทำนาย...
                                            </span>
                                        ) : (
                                            <Button variant="outline">
                                                ทำนายระยะเวลาการรอดชีวิต
                                            </Button>                                            
                                        )}
                                    </Button>
                                    <Button variant="outline" onClick={resetForm} disabled={loading}>
                                        รีเซ็ต
                                    </Button>
                                </div>

                                {result !== null && (
                                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                                        <h3 className="text-lg font-semibold text-green-800">ผลการทำนาย</h3>
                                        <p className="text-green-700">
                                            ระยะเวลาการรอดชีวิตโดยประมาณ: <span className="font-bold">{formatDays(result)}</span> (
                                            {Math.round(result / 100)} วัน)
                                        </p>
                                    </div>
                                )}

                                {error && (
                                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-red-700">{error}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="border rounded-lg p-6 bg-white shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">ข้อมูลโปรเจค</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium">เทคโนโลยีที่ใช้</h3>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-50"
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

export default ProjectDetail
