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
    type?: "button" | "submit" | "reset" // Added type property
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "default",
    size = "default",
    className = "",
    onClick,
    disabled = false,
    type = "button", // Default to "button"
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
            type={type} // Pass the type to the button element
        >
            {children}
        </button>
    )
}

interface ChatMessage {
    role: "user" | "bot"
    content: string
}

const project = {
    id: 2,
    title: "HIV Risk Calculator",
    description: "เครื่องมือคำนวณความเสี่ยงการติดเชื้อ HIV ด้วย AI และระบบแนะนำอัจฉริยะ",
    longDescription:
        "โปรเจกต์นี้เป็นระบบคำนวณความเสี่ยงการติดเชื้อ HIV จากกิจกรรมทางเพศ โดยพิจารณาปัจจัยต่าง ๆ เช่น การใช้ถุงยางอนามัย, การใช้ยา PrEP, และการรักษาด้วยยาต้านไวรัส (ART) ระบบถูกพัฒนาโดยใช้เทคโนโลยี Full-Stack เช่น React, TypeScript, FastAPI และ Tailwind CSS สำหรับฝั่ง UI/UX ที่ตอบสนองได้ดีและเข้าใจง่าย\
        \n\nโปรเจกต์ยังมีการพัฒนา Chatbot อัจฉริยะที่สามารถให้คำแนะนำเฉพาะบุคคลแบบเรียลไทม์ โดยใช้เทคนิค Retrieval-Augmented Generation (RAG) ร่วมกับ Vector Search จากฐานข้อมูลทางการแพทย์ที่น่าเชื่อถือ เช่น CDC และงานวิจัยสากล เพื่อให้คำตอบที่เป็นปัจจุบันและแม่นยำ\
        \n\nโปรเจกต์นี้ได้รับรางวัลอันดับที่ 3 ในการแข่งขันภายใต้โครงการ Beyond Coding ซึ่งมุ่งเน้นการพัฒนาทักษะทางคณิตศาสตร์และการเขียนโปรแกรมเพื่อสายงาน Data Science และ Machine Learning",
    image: "/project-1.jpg",
    gallery: ["/project-2-1.jpg", "/project-2-2.jpg", "/project-2-3.jpg"],
    tags: ["AI", "Risk Assessment", "Healthcare"],
    technologies: [
        "React", "TypeScript", "Tailwind CSS", "FastAPI", "Python",
        "Chatbot", "RAG", "Vector Search", "Docker", "Medical NLP"
    ],
    features: [
        "คำนวณความเสี่ยงการติดเชื้อ HIV โดยอิงจากกิจกรรมและปัจจัยเสี่ยง",
        "รองรับการวิเคราะห์ความเสี่ยงจากหลายปัจจัย เช่น การใช้ถุงยาง, PrEP, ART",
        "แสดงผลลัพธ์ความเสี่ยงในรูปแบบที่เข้าใจง่าย",
        "ระบบ Chatbot ให้คำแนะนำเฉพาะบุคคลด้าน HIV และสุขภาพทางเพศ",
        "ใช้ RAG และ Vector Database เพื่อดึงข้อมูลทางการแพทย์ล่าสุดจากแหล่งที่เชื่อถือได้",
    ],
    challenges:
        "การจัดหาข้อมูลทางการแพทย์ที่ถูกต้องและทันสมัย รวมถึงการออกแบบระบบให้ผู้ใช้เข้าใจง่ายและรู้สึกปลอดภัยในการใช้งานข้อมูลสุขภาพส่วนบุคคล",
    solutions:
        "นำเข้าข้อมูลจาก CDC และแหล่งวิจัยทางการแพทย์ที่ได้รับการยอมรับ พร้อมออกแบบ UX/UI ให้เหมาะสมกับการใช้งานด้านสุขภาพ ใช้ภาษาที่ไม่ซับซ้อนและลดการตีตรา (Stigma)",
    demoUrl: "/hiv-risk-calculator",
    codeUrl: "#",
}



const Beyondpage: React.FC = () => {
    const [act, setAct] = useState<string>("insertive_vaginal_sex")
    const [prep, setPrep] = useState<boolean>(false)
    const [condom, setCondom] = useState<boolean>(false)
    const [artUvl, setArtUvl] = useState<boolean>(false)
    const [acuteHiv, setAcuteHiv] = useState<boolean>(false)
    const [stdNegative, setStdNegative] = useState<boolean>(false)
    const [stdPositive, setStdPositive] = useState<boolean>(false)
    const [result, setResult] = useState<number | null>(null)
    const [riskLevel, setRiskLevel] = useState<string>("")

    // Chatbot states
    const [chatInput, setChatInput] = useState<string>("")
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        { role: "bot", content: "สวัสดีค่ะ ฉันเป็น AI ผู้ช่วยให้ข้อมูลเกี่ยวกับ HIV และโรคติดต่อทางเพศสัมพันธ์ คุณมีคำถามอะไรไหมคะ?" },
    ])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const calculateHIVRisk = () => {
        // Base transmission risk per 10,000 exposures (CDC data)
        const baseRiskPer10000: Record<string, number> = {
            receptive_anal_sex: 138,
            insertive_anal_sex: 11,
            receptive_vaginal_sex: 8,
            insertive_vaginal_sex: 4,
            oral_sex: 0.5,
        }

        // Get activity index for condom effectiveness lookup
        let activityIndex = 1
        if (act === "receptive_anal_sex") {
            activityIndex = 1
        } else if (act === "insertive_anal_sex") {
            activityIndex = 2
        } else if (act === "receptive_vaginal_sex") {
            activityIndex = 3
        } else if (act === "insertive_vaginal_sex") {
            activityIndex = 4
        }

        // Condom effectiveness varies by activity (based on research data)
        const condomEffectiveness: Record<string, number> = {
            male_condom_1: 0.72, // 72% reduction for receptive anal
            male_condom_2: 0.63, // 63% reduction for insertive anal
            male_condom_3: 0.8, // 80% reduction for receptive vaginal
            male_condom_4: 0.8, // 80% reduction for insertive vaginal
        }

        // ART with undetectable viral load reduces transmission by ~96-100%
        const artUvlReductionFactor = 0.04

        // Calculate risk multipliers
        let riskMultiplier = 1

        // Acute HIV infection increases transmission risk substantially
        if (acuteHiv) {
            riskMultiplier *= 7.25 // 7.25x increased risk
        }

        // STIs increase risk for both partners
        if (stdNegative) {
            riskMultiplier *= 2.65 // 2.65x increased risk
        }
        if (stdPositive) {
            riskMultiplier *= 2.65 // 2.65x increased risk
        }

        // Calculate protection factors
        let protectionFactor = 1

        // PrEP is highly effective when taken as prescribed
        if (prep) {
            protectionFactor *= 0.01 // 99% reduction
        }

        // Condom effectiveness
        if (condom) {
            protectionFactor *= condomEffectiveness[`male_condom_${activityIndex}`]
        }

        // ART with undetectable viral load
        if (artUvl) {
            protectionFactor *= artUvlReductionFactor
        }

        // Calculate final risk per 10,000 exposures
        const baseRisk = baseRiskPer10000[act] || 0
        const finalRisk = baseRisk * protectionFactor * riskMultiplier

        // Round to nearest whole number
        const riskValue = Math.round(finalRisk)
        setResult(riskValue)

        // Determine risk level
        if (riskValue === 0) {
            setRiskLevel("ไม่มีความเสี่ยง")
        } else if (riskValue < 1) {
            setRiskLevel("ความเสี่ยงต่ำมาก")
        } else if (riskValue < 10) {
            setRiskLevel("ความเสี่ยงต่ำ")
        } else if (riskValue < 50) {
            setRiskLevel("ความเสี่ยงปานกลาง")
        } else {
            setRiskLevel("ความเสี่ยงสูง")
        }
    }

    const getActivityLabel = (activity: string): string => {
        switch (activity) {
            case "receptive_anal_sex":
                return "การมีเพศสัมพันธ์ทางทวารหนักแบบฝ่ายรับ"
            case "insertive_anal_sex":
                return "การมีเพศสัมพันธ์ทางทวารหนักแบบฝ่ายรุก"
            case "receptive_vaginal_sex":
                return "การมีเพศสัมพันธ์ทางช่องคลอดแบบฝ่ายรับ"
            case "insertive_vaginal_sex":
                return "การมีเพศสัมพันธ์ทางช่องคลอดแบบฝ่ายรุก"
            case "oral_sex":
                return "การมีเพศสัมพันธ์ทางปาก"
            default:
                return activity
        }
    }

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!chatInput.trim()) return

        // Add user message to chat
        const userMessage: ChatMessage = { role: "user", content: chatInput }
        setChatMessages((prev) => [...prev, userMessage])

        // Clear input and set loading state
        setChatInput("")
        setIsLoading(true)

        try {
            // Call the API
            const response = await fetch("https://640510702phithak-martiie.hf.space/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: chatInput }),
            })

            if (!response.ok) {
                throw new Error("เกิดข้อผิดพลาดในการเชื่อมต่อกับ API")
            }

            const data = await response.json()

            // Add bot response to chat
            const botMessage: ChatMessage = { role: "bot", content: data.response }
            setChatMessages((prev) => [...prev, botMessage])
        } catch (error) {
            // Add error message to chat
            const errorMessage: ChatMessage = {
                role: "bot",
                content: "ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ โปรดลองใหม่อีกครั้ง",
            }
            setChatMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
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

                            <div>
                                <h2 className="text-2xl font-semibold mb-2">ข้อมูลความเสี่ยงพื้นฐาน</h2>
                                <p className="mb-2">ความเสี่ยงต่อการสัมผัสเชื้อ 10,000 ครั้ง:</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>การมีเพศสัมพันธ์ทางทวารหนักแบบฝ่ายรับ: 138</li>
                                    <li>การมีเพศสัมพันธ์ทางทวารหนักแบบฝ่ายรุก: 11</li>
                                    <li>การมีเพศสัมพันธ์ทางช่องคลอดแบบฝ่ายรับ: 8</li>
                                    <li>การมีเพศสัมพันธ์ทางช่องคลอดแบบฝ่ายรุก: 4</li>
                                    <li>การมีเพศสัมพันธ์ทางปาก: &lt;1</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="border rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">ทดลองใช้งานเครื่องคำนวณความเสี่ยง</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">ประเภทกิจกรรมทางเพศ</label>
                                    <select
                                        value={act}
                                        onChange={(e) => setAct(e.target.value)}
                                        className="w-full border border-gray-300 px-4 py-2 rounded-md"
                                    >
                                        <option value="receptive_anal_sex">การมีเพศสัมพันธ์ทางทวารหนักแบบฝ่ายรับ</option>
                                        <option value="insertive_anal_sex">การมีเพศสัมพันธ์ทางทวารหนักแบบฝ่ายรุก</option>
                                        <option value="receptive_vaginal_sex">การมีเพศสัมพันธ์ทางช่องคลอดแบบฝ่ายรับ</option>
                                        <option value="insertive_vaginal_sex">การมีเพศสัมพันธ์ทางช่องคลอดแบบฝ่ายรุก</option>
                                        <option value="oral_sex">การมีเพศสัมพันธ์ทางปาก</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-m font-extrabold mb-1">วิธีป้องกัน</label>

                                    <div className="flex items-center justify-between">
                                        <label htmlFor="prep" className="text-sm">
                                            PrEP (ยาป้องกันก่อนการสัมผัสเชื้อ)
                                        </label>
                                        <input
                                            type="checkbox"
                                            id="prep"
                                            checked={prep}
                                            onChange={(e) => setPrep(e.target.checked)}
                                            className="h-4 w-4"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label htmlFor="condom" className="text-sm">
                                            ถุงยางอนามัย
                                        </label>
                                        <input
                                            type="checkbox"
                                            id="condom"
                                            checked={condom}
                                            onChange={(e) => setCondom(e.target.checked)}
                                            className="h-4 w-4"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label htmlFor="artUvl" className="text-sm">
                                            คู่นอนที่มีเชื้อ HIV ได้รับยาต้านไวรัสและมีปริมาณไวรัสต่ำจนตรวจไม่พบ
                                        </label>
                                        <input
                                            type="checkbox"
                                            id="artUvl"
                                            checked={artUvl}
                                            onChange={(e) => setArtUvl(e.target.checked)}
                                            className="h-4 w-4"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-m font-extrabold mb-1">ปัจจัยเสี่ยงเพิ่มเติม</label>

                                    <div className="flex items-center justify-between">
                                        <label htmlFor="acuteHiv" className="text-sm">
                                            คู่นอนที่มีเชื้อ HIV อยู่ในระยะติดเชื้อเฉียบพลัน
                                        </label>
                                        <input
                                            type="checkbox"
                                            id="acuteHiv"
                                            checked={acuteHiv}
                                            onChange={(e) => setAcuteHiv(e.target.checked)}
                                            className="h-4 w-4"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label htmlFor="stdNegative" className="text-sm">
                                            คุณมีโรคติดต่อทางเพศสัมพันธ์อื่น
                                        </label>
                                        <input
                                            type="checkbox"
                                            id="stdNegative"
                                            checked={stdNegative}
                                            onChange={(e) => setStdNegative(e.target.checked)}
                                            className="h-4 w-4"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label htmlFor="stdPositive" className="text-sm">
                                            คู่นอนที่มีเชื้อ HIV มีโรคติดต่อทางเพศสัมพันธ์อื่น
                                        </label>
                                        <input
                                            type="checkbox"
                                            id="stdPositive"
                                            checked={stdPositive}
                                            onChange={(e) => setStdPositive(e.target.checked)}
                                            className="h-4 w-4"
                                        />
                                    </div>
                                </div>

                                <Button onClick={calculateHIVRisk} variant="outline">คำนวณความเสี่ยง</Button>

                                {result !== null && (
                                    <div className="mt-4 p-4 border rounded-md">
                                        <h3 className="font-semibold mb-2">ผลการคำนวณ</h3>
                                        <p>กิจกรรม: {getActivityLabel(act)}</p>
                                        <p>
                                            ความเสี่ยงต่อการสัมผัสเชื้อ 10,000 ครั้ง:{" "}
                                            <span
                                                className={`font-bold ${result === 0
                                                        ? "text-green-600"
                                                        : result < 1
                                                            ? "text-green-500"
                                                            : result < 10
                                                                ? "text-yellow-500"
                                                                : result < 50
                                                                    ? "text-orange-500"
                                                                    : "text-red-600"
                                                    }`}
                                            >
                                                {result}
                                            </span>
                                        </p>
                                        <p>
                                            ระดับความเสี่ยง:{" "}
                                            <span
                                                className={`font-bold ${riskLevel === "ไม่มีความเสี่ยง"
                                                        ? "text-green-600"
                                                        : riskLevel === "ความเสี่ยงต่ำมาก"
                                                            ? "text-green-500"
                                                            : riskLevel === "ความเสี่ยงต่ำ"
                                                                ? "text-yellow-500"
                                                                : riskLevel === "ความเสี่ยงปานกลาง"
                                                                    ? "text-orange-500"
                                                                    : "text-red-600"
                                                    }`}
                                            >
                                                {riskLevel}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">
                                            หมายเหตุ: ข้อมูลนี้เป็นการประมาณการณ์เท่านั้น ไม่ใช่คำแนะนำทางการแพทย์
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Chatbot Section */}
                        <div className="border rounded-lg p-6">
                            <h2 className="text-xl font-semibold mb-4">สอบถามข้อมูลเพิ่มเติม</h2>
                            <div className="flex flex-col h-96">
                                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                                    {chatMessages.map((message, index) => (
                                        <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                            <div
                                                className={`max-w-[80%] p-3 rounded-lg ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {message.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800">
                                                <div className="flex space-x-2">
                                                    <div
                                                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                                        style={{ animationDelay: "0ms" }}
                                                    ></div>
                                                    <div
                                                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                                        style={{ animationDelay: "300ms" }}
                                                    ></div>
                                                    <div
                                                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                                        style={{ animationDelay: "600ms" }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <form onSubmit={handleChatSubmit} className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        placeholder="พิมพ์คำถามเกี่ยวกับ HIV และโรคติดต่อทางเพศสัมพันธ์..."
                                        className="flex-1 border border-gray-300 px-4 py-2 rounded-md"
                                        disabled={isLoading}
                                    />
                                    <Button type="submit" disabled={isLoading || !chatInput.trim()}>
                                        ส่ง
                                    </Button>
                                </form>
                            </div>
                            <div className="mt-4 text-sm text-gray-500">
                                <p>คุณสามารถถามคำถามเกี่ยวกับ HIV และโรคติดต่อทางเพศสัมพันธ์ เช่น วิธีการป้องกัน, อาการ, การตรวจ, และการรักษา</p>
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

export default Beyondpage
