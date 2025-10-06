"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Upload, FileText, MessageCircle, Database, Brain, Trash2, Send, Bot, User } from "lucide-react"
import Layout from "../../components/Layout"

interface ChatMessage {
    role: "user" | "bot"
    content: string
    timestamp: Date
}

interface UploadResponse {
    status: string
    title: string
    count: number
}

// Replace with your actual API URL
const API_BASE_URL = "https://640510702phithak-llm-rag-api.hf.space"

export default function RAGChatbotDemo() {
    const [documents, setDocuments] = useState<string[]>([])
    const [isUploading, setIsUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<string>("")
    const [activeTab, setActiveTab] = useState("demo")

    // Chat states
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            role: "bot",
            content:
                "สวัสดีค่ะ! ดิฉันชื่อนิตยา ดิฉันสามารถตอบคำถามโดยอิงจากเอกสารที่คุณอัปโหลดมาได้ กรุณาอัปโหลดเอกสารก่อน แล้วถามคำถามเกี่ยวกับเนื้อหาในเอกสารได้เลยค่ะ",
            timestamp: new Date(),
        },
    ])
    const [chatInput, setChatInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    // Clear history on tab change
    useEffect(() => {
        fetchClearHistory()
    }, [])

    const fetchClearHistory = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/`, {
                method: "POST", // สำคัญ! ต้องเป็น POST ถึงจะเคลียร์ได้
            })
            if (response.ok) {
                const data = await response.json()
                console.log("History cleared:", data.message)
            }
        } catch (error) {
            console.error("Error clearing history:", error)
        }
    }


    // Fetch document titles
    const fetchDocuments = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/titles`)
            if (response.ok) {
                const data = await response.json()
                setDocuments(data.titles || [])
            }
        } catch (error) {
            console.error("Error fetching documents:", error)
        }
    }

    // Upload file handler
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        setUploadStatus("")

        const formData = new FormData()
        formData.append("file", file)

        try {
            const response = await fetch(`${API_BASE_URL}/upload-file`, {
                method: "POST",
                body: formData,
            })

            if (response.ok) {
                const data: UploadResponse = await response.json()
                setUploadStatus(`อัปโหลดสำเร็จ: ${data.title} (รวม ${data.count} เอกสาร)`)
                await fetchDocuments()
            } else {
                const error = await response.json()
                setUploadStatus(`เกิดข้อผิดพลาด: ${error.detail}`)
            }
        } catch (error) {
            setUploadStatus("เกิดข้อผิดพลาดในการอัปโหลด")
        } finally {
            setIsUploading(false)
            event.target.value = ""
        }
    }

    // Delete document handler
    const handleDeleteDocument = async (title: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/delete-by-title`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title }),
            })

            if (response.ok) {
                const data = await response.json()
                setUploadStatus(`ลบเอกสารสำเร็จ (เหลือ ${data.remaining} เอกสาร)`)
                await fetchDocuments()
            } else {
                const error = await response.json()
                setUploadStatus(`เกิดข้อผิดพลาดในการลบ: ${error.detail}`)
            }
        } catch (error) {
            setUploadStatus("เกิดข้อผิดพลาดในการลบเอกสาร")
        }
    }

    // Chat submit handler
    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!chatInput.trim() || isLoading) return

        const userMessage: ChatMessage = {
            role: "user",
            content: chatInput,
            timestamp: new Date(),
        }

        setChatMessages((prev) => [...prev, userMessage])
        setChatInput("")
        setIsLoading(true)

        try {
            const response = await fetch(`${API_BASE_URL}/chat?query=${encodeURIComponent(chatInput)}`)

            if (response.ok) {
                const data = await response.json()
                const botMessage: ChatMessage = {
                    role: "bot",
                    content: data.answer || "ขออภัย ไม่สามารถประมวลผลคำถามได้",
                    timestamp: new Date(),
                }
                setChatMessages((prev) => [...prev, botMessage])
            } else {
                const errorMessage: ChatMessage = {
                    role: "bot",
                    content: "ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ กรุณาลองใหม่อีกครั้ง",
                    timestamp: new Date(),
                }
                setChatMessages((prev) => [...prev, errorMessage])
            }
        } catch (error) {
            const errorMessage: ChatMessage = {
                role: "bot",
                content: "ขออภัย ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต",
                timestamp: new Date(),
            }
            setChatMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    // Load documents on component mount
    useEffect(() => {
        fetchDocuments()
    }, [])

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Nittaya Chatbot</h1>
                        <p className="text-lg text-gray-600 mb-4">
                            แชทบอทที่ใช้เทคนิค Retrieval-Augmented Generation (RAG) เพื่อให้คำตอบที่แม่นยำจากเอกสารของคุณ
                        </p>
                        <p className="text-md text-gray-600">
                            อัปโหลดไฟล์ เช่น .pdf, .docx หรือ .xlsx แล้วถามคำถามที่ต้องการ ระบบจะค้นหาและสรุปข้อมูลที่เกี่ยวข้องอย่างรวดเร็ว พร้อมแสดงคำตอบในภาษาที่เข้าใจง่าย
                        </p>
                        <div className="flex justify-center gap-2 flex-wrap">
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                React + TypeScript
                            </span>
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                Gemini
                            </span>
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                FastAPI
                            </span>
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                FAISS Vector DB
                            </span>
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                RAG
                            </span>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="w-full">
                        <div className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                            {[
                                { id: "demo", label: "Demo", icon: MessageCircle },
                                { id: "documents", label: "จัดการเอกสาร", icon: Database },
                                { id: "about", label: "เกี่ยวกับระบบ", icon: Brain },
                                { id: "api", label: "API Documentation", icon: FileText },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium leading-5 ${activeTab === tab.id
                                        ? "bg-white text-blue-700 shadow"
                                        : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="mt-6">
                            {/* Demo Tab */}
                            {activeTab === "demo" && (
                                <div className="bg-white rounded-lg shadow-lg flex flex-col" style={{ height: "600px" }}>
                                    <div className="p-6 border-b flex-shrink-0">
                                        <h2 className="text-xl font-semibold flex items-center gap-2">
                                            <MessageCircle className="w-5 h-5" />
                                            ทดลองใช้งาน RAG Chatbot
                                        </h2>
                                        <p className="text-gray-600 mt-1">
                                            ถามคำถามเกี่ยวกับเนื้อหาในเอกสารที่อัปโหลด AI จะค้นหาข้อมูลที่เกี่ยวข้องและตอบคำถามให้คุณ
                                        </p>
                                    </div>
                                    <div className="flex-1 flex flex-col p-6 min-h-0">
                                        <div className="flex-1 mb-4 p-4 border rounded-lg bg-gray-50 overflow-y-auto min-h-0">
                                            <div className="space-y-4">
                                                {chatMessages.map((message, index) => (
                                                    <div
                                                        key={index}
                                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                                    >
                                                        <div
                                                            className={`max-w-[80%] p-3 rounded-lg ${message.role === "user"
                                                                ? "bg-blue-500 text-white"
                                                                : "bg-white text-gray-800 border shadow-sm"
                                                                }`}
                                                        >
                                                            <div className="flex items-start gap-2">
                                                                {message.role === "bot" ? (
                                                                    <Bot className="w-4 h-4 mt-1 text-blue-500" />
                                                                ) : (
                                                                    <User className="w-4 h-4 mt-1" />
                                                                )}
                                                                <div className="flex-1">
                                                                    <div className="whitespace-pre-wrap">{message.content}</div>
                                                                    <div className="text-xs opacity-70 mt-1">
                                                                        {message.timestamp.toLocaleTimeString("th-TH")}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {isLoading && (
                                                    <div className="flex justify-start">
                                                        <div className="max-w-[80%] p-3 rounded-lg bg-white text-gray-800 border shadow-sm">
                                                            <div className="flex items-center space-x-2">
                                                                <Bot className="w-4 h-4 text-blue-500" />
                                                                <div className="flex items-center space-x-1">
                                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                                                                    <span>กำลังค้นหาข้อมูลและสร้างคำตอบ...</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <form onSubmit={handleChatSubmit} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={chatInput}
                                                    onChange={(e) => setChatInput(e.target.value)}
                                                    placeholder="พิมพ์คำถามของคุณที่นี่..."
                                                    disabled={isLoading}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={isLoading || !chatInput.trim()}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Send className="w-4 h-4" />
                                                </button>
                                            </form>
                                            <div className="mt-2 text-sm text-gray-500">
                                                เคล็ดลับ: อัปโหลดเอกสารในแท็บ "จัดการเอกสาร" ก่อนถามคำถาม
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Documents Tab */}
                            {activeTab === "documents" && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white rounded-lg shadow-lg">
                                        <div className="p-6 border-b">
                                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                                <Upload className="w-5 h-5" />
                                                อัปโหลดเอกสาร
                                            </h2>
                                            <p className="text-gray-600 mt-1">รองรับไฟล์ประเภท PDF, TXT, DOCX, XLSX</p>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                                                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                                    <label htmlFor="file-upload" className="cursor-pointer">
                                                        <span className="text-blue-600 hover:text-blue-500 font-medium">คลิกเพื่อเลือกไฟล์</span>
                                                        <input
                                                            id="file-upload"
                                                            type="file"
                                                            className="hidden"
                                                            accept=".pdf,.txt,.docx,.xlsx,.xls"
                                                            onChange={handleFileUpload}
                                                            disabled={isUploading}
                                                        />
                                                    </label>
                                                    <p className="text-sm text-gray-500 mt-2">หรือลากไฟล์มาวางที่นี่</p>
                                                    <div className="mt-3 text-xs text-gray-400">รองรับ: PDF, TXT, DOCX, XLSX (ขนาดไม่เกิน 10MB)</div>
                                                </div>
                                                {isUploading && (
                                                    <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-2"></div>
                                                        <span className="text-blue-700">กำลังประมวลผลไฟล์...</span>
                                                    </div>
                                                )}
                                                {uploadStatus && (
                                                    <div className="p-3 rounded-lg bg-gray-100 text-sm border-l-4 border-blue-500">
                                                        {uploadStatus}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-lg">
                                        <div className="p-6 border-b">
                                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                                <FileText className="w-5 h-5" />
                                                เอกสารในระบบ ({documents.length})
                                            </h2>
                                            <p className="text-gray-600 mt-1">รายการเอกสารที่อัปโหลดแล้ว</p>
                                        </div>
                                        <div className="p-6">
                                            <div className="h-64 overflow-y-auto">
                                                {documents.length === 0 ? (
                                                    <div className="text-center text-gray-500 py-8">
                                                        <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                                                        <div className="font-medium">ยังไม่มีเอกสารในระบบ</div>
                                                        <div className="text-sm mt-1">กรุณาอัปโหลดเอกสารเพื่อเริ่มใช้งาน</div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {documents.map((title, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                                                            >
                                                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                                                    <FileText className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                                    <span className="text-sm font-medium truncate" title={title}>
                                                                        {title}
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    onClick={() => handleDeleteDocument(title)}
                                                                    className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded flex-shrink-0"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* About Tab */}
                            {activeTab === "about" && (
                                <div className="space-y-6">
                                    {/* Hero Image Section */}
                                    <div className="bg-white rounded-lg shadow-lg">
                                        <div className="p-6">
                                            <div className="text-center mb-6">
                                                <h2 className="text-2xl font-bold text-gray-900 mb-4">RAG Chatbot System Overview</h2>
                                                <img
                                                    src="/project6/workflow.png"
                                                    alt="RAG Chatbot System Overview"
                                                // className="w-full h-72 object-cover rounded-lg border shadow-sm"
                                                />
                                                {/* <p className="text-sm text-gray-500 mt-3">ภาพรวมระบบ RAG Chatbot และการทำงานแบบครบวงจร</p> */}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-white rounded-lg shadow-lg">
                                            <div className="p-6 border-b">
                                                <h2 className="text-xl font-semibold">RAG คืออะไร?</h2>
                                            </div>
                                            <div className="p-6 space-y-4">
                                                <p className="text-gray-700">
                                                    <strong>Retrieval Augmented Generation (RAG)</strong> เป็นเทคนิคที่ผสมผสานระหว่าง:
                                                </p>
                                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                                    <li>
                                                        <strong>การค้นหาข้อมูล (Retrieval):</strong> ค้นหาข้อมูลที่เกี่ยวข้องจากฐานความรู้
                                                    </li>
                                                    <li>
                                                        <strong>การสร้างคำตอบ (Generation):</strong> ใช้ AI สร้างคำตอบจากข้อมูลที่ค้นพบ
                                                    </li>
                                                </ul>
                                                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                                    <h4 className="font-semibold text-blue-800 mb-2">ข้อดีของ RAG:</h4>
                                                    <ul className="text-sm text-blue-700 space-y-1">
                                                        <li>• ข้อมูลทันสมัยและแม่นยำ</li>
                                                        <li>• ลดการ "หลอน" ของ AI (Hallucination)</li>
                                                        <li>• ตอบคำถามเฉพาะเจาะจง</li>
                                                        <li>• อ้างอิงแหล่งที่มาได้</li>
                                                        <li>• ปรับปรุงความรู้ได้ง่าย</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-lg shadow-lg">
                                            <div className="p-6 border-b">
                                                <h2 className="text-xl font-semibold">เกี่ยวกับระบบ</h2>
                                            </div>
                                            <div className="p-6 space-y-4">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                            1
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold">อัปโหลดเอกสาร</div>
                                                            <div className="text-sm text-gray-600">รองรับ PDF, TXT, DOCX, XLSX</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                            2
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold">สร้าง Embeddings</div>
                                                            <div className="text-sm text-gray-600">แปลงข้อความเป็นเวกเตอร์</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                            3
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold">จัดเก็บใน FAISS</div>
                                                            <div className="text-sm text-gray-600">Vector Database สำหรับค้นหา</div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                            4
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold">ตอบคำถามด้วย Gemini</div>
                                                            <div className="text-sm text-gray-600">สร้างคำตอบจากข้อมูลที่เกี่ยวข้อง</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 bg-white rounded-lg shadow-lg">
                                            <div className="p-6 border-b">
                                                <h2 className="text-xl font-semibold">คุณสมบัติหลัก</h2>
                                            </div>
                                            <div className="p-6">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                            <span className="text-sm">รองรับไฟล์หลายประเภท (PDF, DOCX, XLSX, TXT)</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                            <span className="text-sm">ค้นหาข้อมูลด้วย Vector Similarity</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                                            <span className="text-sm">ตอบคำถามด้วย Google Gemini</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                                            <span className="text-sm">จัดการเอกสารแบบเรียลไทม์</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                            <span className="text-sm">รองรับภาษาไทยเต็มรูปแบบ</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                                            <span className="text-sm">UI/UX ที่ใช้งานง่าย</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* API Documentation Tab */}
                            {activeTab === "api" && (
                                <div className="space-y-6">
                                    <div className="bg-white rounded-lg shadow-lg">
                                        <div className="p-6 border-b">
                                            <h2 className="text-xl font-semibold">API Endpoints</h2>
                                            <p className="text-gray-600 mt-1">
                                                ระบบ Backend ที่รองรับการทำงานของ RAG Chatbot<br />
                                                ดูซอร์สโค้ดบน GitHub:
                                                <a
                                                    href="https://github.com/martiie/LLM-RAG-APIs"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 underline ml-1"
                                                >
                                                    https://github.com/martiie/LLM-RAG-APIs
                                                </a>
                                            </p>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                <div className="border rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                            GET
                                                        </span>
                                                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">/chat</code>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">รับคำถามและส่งคืนคำตอบจาก RAG system</p>
                                                    <div className="text-xs text-gray-500">
                                                        <strong>Parameters:</strong> query (string) - คำถามที่ต้องการถาม
                                                    </div>
                                                </div>

                                                <div className="border rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                            GET
                                                        </span>
                                                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">/titles</code>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">ดึงรายชื่อเอกสารทั้งหมดในระบบ</p>
                                                    <div className="text-xs text-gray-500">
                                                        <strong>Response:</strong> {"{ titles: string[] }"}
                                                    </div>
                                                </div>

                                                <div className="border rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                            POST
                                                        </span>
                                                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">/upload-file</code>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">อัปโหลดและประมวลผลเอกสารใหม่</p>
                                                    <div className="text-xs text-gray-500">
                                                        <strong>Body:</strong> FormData with file
                                                        <br />
                                                        <strong>Supported:</strong> PDF, TXT, DOCX, XLSX
                                                    </div>
                                                </div>

                                                <div className="border rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                                            PUT
                                                        </span>
                                                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">/update</code>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">แก้ไขเนื้อหาเอกสารที่มีอยู่</p>
                                                    <div className="text-xs text-gray-500">
                                                        <strong>Body:</strong> {"{ title: string, content: string }"}
                                                    </div>
                                                </div>

                                                <div className="border rounded-lg p-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                                            DELETE
                                                        </span>
                                                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">/delete-by-title</code>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mb-2">ลบเอกสารออกจากระบบ</p>
                                                    <div className="text-xs text-gray-500">
                                                        <strong>Body:</strong> {"{ title: string }"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-lg">
                                        <div className="p-6 border-b">
                                            <h2 className="text-xl font-semibold">📊 การประมวลผลเอกสาร</h2>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="border rounded-lg p-4">
                                                        <h4 className="font-semibold mb-2">📄 ประเภทไฟล์ที่รองรับ</h4>
                                                        <ul className="text-sm space-y-1">
                                                            <li>
                                                                • <strong>PDF:</strong> ใช้ PyPDF2 แยกข้อความ
                                                            </li>
                                                            <li>
                                                                • <strong>TXT:</strong> อ่านข้อความโดยตรง
                                                            </li>
                                                            <li>
                                                                • <strong>DOCX:</strong> ใช้ python-docx
                                                            </li>
                                                            <li>
                                                                • <strong>XLSX:</strong> ใช้ pandas แปลงเป็น CSV
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="border rounded-lg p-4">
                                                        <h4 className="font-semibold mb-2">🔍 การประมวลผล</h4>
                                                        <ul className="text-sm space-y-1">
                                                            <li>• แบ่งข้อความเป็น chunks</li>
                                                            <li>• สร้าง embeddings</li>
                                                            <li>• จัดเก็บใน FAISS database</li>
                                                            <li>• ค้นหาด้วย cosine similarity</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
