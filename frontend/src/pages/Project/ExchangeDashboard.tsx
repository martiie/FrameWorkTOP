"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Layout from "../../components/Layout"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts"

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
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 hover:bg-gray-100",
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

interface ExchangeRate {
  period: string
  rate: number
}


// Project information
const project = {
  title: "อัตราแลกเปลี่ยนเงิน (THB/USD)",
  description: "ระบบแสดงข้อมูลและวิเคราะห์อัตราแลกเปลี่ยนเงินบาทต่อดอลลาร์สหรัฐ",
  longDescription:
    "โปรเจกต์นี้เป็นระบบแสดงข้อมูลและวิเคราะห์อัตราแลกเปลี่ยนเงินบาทต่อดอลลาร์สหรัฐแบบ interactive โดยใช้ข้อมูลจาก API ของแหล่งที่น่าเชื่อถือ ผู้ใช้สามารถดูข้อมูลย้อนหลัง เปรียบเทียบข้อมูลระหว่างช่วงเวลาต่างๆ รวมถึงรับคำแนะนำเบื้องต้นเกี่ยวกับแนวโน้มของอัตราแลกเปลี่ยน ระบบมีการแสดงผลในรูปแบบกราฟและตาราง พร้อมสถิติที่สำคัญ เช่น ค่าสูงสุด-ต่ำสุด ค่าเฉลี่ย และค่าเบี่ยงเบนมาตรฐาน เพื่อช่วยให้ผู้ใช้เข้าใจแนวโน้มและการเปลี่ยนแปลงของอัตราแลกเปลี่ยนได้ง่ายขึ้น เหมาะสำหรับนักลงทุน นักท่องเที่ยว และผู้ที่สนใจด้านเศรษฐกิจการเงิน",
  features: [
    "แสดงข้อมูลอัตราแลกเปลี่ยนแบบวันต่อวันในรูปแบบกราฟและตาราง",
    "เลือกช่วงเวลาเพื่อดูและเปรียบเทียบข้อมูลย้อนหลัง",
    "แสดงสถิติสรุป เช่น ค่าเฉลี่ย ค่าสูงสุด ค่าต่ำสุด และส่วนเบี่ยงเบนมาตรฐาน",
  ],
  technologies: ["ETL", "Visualization", "REST API","PostgreSQL"],
  challenges:
    "การรวบรวมข้อมูลอัตราแลกเปลี่ยนที่ถูกต้องและเป็นปัจจุบัน รวมถึงการออกแบบกราฟและตารางให้เข้าใจง่ายและตอบสนองต่อการโต้ตอบของผู้ใช้ได้อย่างราบรื่น",
  solutions:
    "ใช้ REST API ในการดึงข้อมูลแบบ real-time พัฒนา UI ด้วย React และ Tailwind CSS เพื่อให้แสดงผลได้ชัดเจนและสวยงาม",
};


const ExchangeDashboard: React.FC = () => {
  const [data, setData] = useState<ExchangeRate[]>([])
  const [allData, setAllData] = useState<ExchangeRate[]>([])
  const [availablePeriods, setAvailablePeriods] = useState<Record<number, number[]>>({})
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)

  // Primary comparison (previous year)
  const [comparePrevYear, setComparePrevYear] = useState(false)
  const [prevYearData, setPrevYearData] = useState<ExchangeRate[]>([])

  // Secondary comparison (custom period)
  const [compareCustom, setCompareCustom] = useState(false)
  const [customCompYear, setCustomCompYear] = useState<number | null>(null)
  const [customCompMonth, setCustomCompMonth] = useState<number | null>(null)
  const [customCompData, setCustomCompData] = useState<ExchangeRate[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("chart")
  const [viewAllData, setViewAllData] = useState(true)

  // Colors for the chart lines
  const colors = {
    primary: "#2563eb",
    prevYear: "#f97316",
    custom: "#10b981",
    all: "#6366f1",
  }

  // Fetch available periods
  useEffect(() => {
    fetch("https://640510702phithak-martiie.hf.space/available_periods/")
      .then((res) => res.json())
      .then((data) => setAvailablePeriods(data))
  }, [])

  // Fetch all data
  useEffect(() => {
    fetch("https://640510702phithak-martiie.hf.space/exchange_rates/all")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch all data")
        return res.json()
      })
      .then((data) => {
        const formatted = data.map((item: [string, number]) => ({
          period: item[0],
          rate: item[1],
        }))
        setAllData(formatted)
      })
      .catch((err) => {
        setError("Failed to load all data: " + err.message)
      })
  }, [])

  // Fetch filtered data
  useEffect(() => {
    if (selectedYear && selectedMonth) {
      setLoading(true)
      fetch(`https://640510702phithak-martiie.hf.space/exchange_rates/?year=${selectedYear}&month=${selectedMonth}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch data")
          return res.json()
        })
        .then((data) => {
          const formatted = data.map((item: [string, number]) => ({
            period: item[0],
            rate: item[1],
          }))
          setData(formatted)
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })
    }
  }, [selectedYear, selectedMonth])

  // Fetch previous year data for comparison
  useEffect(() => {
    if (comparePrevYear && selectedYear && selectedMonth) {
      fetch(`https://640510702phithak-martiie.hf.space/exchange_rates/?year=${selectedYear - 1}&month=${selectedMonth}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch comparison data")
          return res.json()
        })
        .then((data) => {
          const formatted = data.map((item: [string, number]) => ({
            period: item[0],
            rate: item[1],
          }))
          setPrevYearData(formatted)
        })
        .catch(() => {
          setPrevYearData([])
          setError("Failed to load comparison data")
        })
    } else {
      setPrevYearData([])
    }
  }, [comparePrevYear, selectedYear, selectedMonth])

  // Fetch custom comparison data
  useEffect(() => {
    if (compareCustom && customCompYear && customCompMonth) {
      fetch(`https://640510702phithak-martiie.hf.space/exchange_rates/?year=${customCompYear}&month=${customCompMonth}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch custom comparison data")
          return res.json()
        })
        .then((data) => {
          const formatted = data.map((item: [string, number]) => ({
            period: item[0],
            rate: item[1],
          }))
          setCustomCompData(formatted)
        })
        .catch(() => {
          setCustomCompData([])
          setError("Failed to load custom comparison data")
        })
    } else {
      setCustomCompData([])
    }
  }, [compareCustom, customCompYear, customCompMonth])

  // Prepare chart data with previous year first (on the left)
  const prepareChartData = () => {
    if (viewAllData) {
      return allData
    }

    // Create a map of all periods across all datasets
    const allPeriods = new Set<string>()

    // Add periods from all datasets
    data.forEach((item) => allPeriods.add(item.period))
    prevYearData.forEach((item) => allPeriods.add(item.period))
    customCompData.forEach((item) => allPeriods.add(item.period))

    // Sort periods chronologically
    const sortedPeriods = Array.from(allPeriods).sort()

    // Create the combined dataset
    return sortedPeriods.map((period) => {
      const result: any = { period }

      // Add previous year data first (so it appears on the left in the chart)
      if (comparePrevYear) {
        const prevYearItem = prevYearData.find((item) => item.period === period)
        if (prevYearItem) {
          result.prevYear = prevYearItem.rate
        }
      }

      // Add current year data
      const currentYearItem = data.find((item) => item.period === period)
      if (currentYearItem) {
        result.current = currentYearItem.rate
      }

      // Add custom comparison data
      if (compareCustom) {
        const customItem = customCompData.find((item) => item.period === period)
        if (customItem) {
          result.custom = customItem.rate
        }
      }

      return result
    })
  }

  // Get all comparison options for the legend
  const getComparisonOptions = () => {
    if (viewAllData) {
      return [
        {
          label: "ข้อมูลทั้งหมด",
          color: colors.all,
          dataKey: "rate",
        },
      ]
    }

    const options = []

    if (comparePrevYear && selectedYear && selectedMonth) {
      options.push({
        year: selectedYear - 1,
        month: selectedMonth,
        label: `${selectedYear - 1}/${selectedMonth}`,
        color: colors.prevYear,
        dataKey: "prevYear",
      })
    }

    if (selectedYear && selectedMonth) {
      options.push({
        year: selectedYear,
        month: selectedMonth,
        label: `${selectedYear}/${selectedMonth}`,
        color: colors.primary,
        dataKey: "current",
      })
    }

    if (compareCustom && customCompYear && customCompMonth) {
      options.push({
        year: customCompYear,
        month: customCompMonth,
        label: `${customCompYear}/${customCompMonth}`,
        color: colors.custom,
        dataKey: "custom",
      })
    }

    return options
  }

  // Generate recommendation based on exchange rate data


  const chartData = prepareChartData()
  const comparisonOptions = getComparisonOptions()
  const displayData = viewAllData ? allData : data

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Project Introduction Section */}
        <div className="mb-8">
          <Button variant="outline" size="sm" className="mb-4">
            <Link to="/projects">← กลับไปยังหน้าผลงาน</Link>
          </Button>

          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg mb-6">{project.description}</p>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">รายละเอียดโปรเจค</h2>
                  <p className="text-gray-700">{project.longDescription}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-2">คุณสมบัติหลัก</h2>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-2">ความท้าทายและวิธีแก้ไข</h2>
                  <h3 className="text-xl font-medium mb-1">ความท้าทาย</h3>
                  <p className="mb-4 text-gray-700">{project.challenges}</p>
                  <h3 className="text-xl font-medium mb-1">วิธีแก้ไข</h3>
                  <p className="text-gray-700">{project.solutions}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
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

              <div className="border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">แหล่งข้อมูล</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>ธนาคารแห่งประเทศไทย</li>
                  <li>สำนักงานสถิติแห่งชาติ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Section */}
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-3xl font-bold mb-6">แดชบอร์ดอัตราแลกเปลี่ยน</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Chart/Table */}
            <div className="lg:col-span-2">
              {/* Error message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading state */}
              {loading && !viewAllData && (
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-[400px] bg-gray-200 rounded-lg"></div>
                    <div className="flex justify-center space-x-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-4 w-20 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Chart and data display */}
              {((viewAllData && allData.length > 0) || (!viewAllData && !loading && !error && data.length > 0)) && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                      <button
                        className={`px-6 py-3 border-b-2 font-medium text-sm ${
                          activeTab === "chart"
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveTab("chart")}
                      >
                        กราฟ
                      </button>
                      <button
                        className={`px-6 py-3 border-b-2 font-medium text-sm ${
                          activeTab === "table"
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveTab("table")}
                      >
                        ตาราง
                      </button>
                    </nav>
                  </div>

                  {activeTab === "chart" && (
                    <div className="p-6">
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold">กราฟอัตราแลกเปลี่ยน</h2>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {comparisonOptions.map((option, index) => (
                            <div key={index} className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: option.color }}
                              ></div>
                              <span className="text-sm">{option.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey="period" />
                            <YAxis domain={["dataMin", "dataMax"]} />
                            <Tooltip
                              formatter={(value: number) => [value.toFixed(4), "อัตราแลกเปลี่ยน"]}
                              labelFormatter={(label) => `วันที่: ${label}`}
                            />
                            <Legend />

                            {viewAllData ? (
                              <Line
                                type="monotone"
                                dataKey="rate"
                                name="ข้อมูลทั้งหมด"
                                stroke={colors.all}
                                dot={false}
                                activeDot={{ r: 6 }}
                              />
                            ) : (
                              comparisonOptions.map((option, index) => (
                                <Line
                                  key={index}
                                  type="monotone"
                                  dataKey={option.dataKey}
                                  name={option.label}
                                  stroke={option.color}
                                  dot={false}
                                  activeDot={{ r: 6 }}
                                />
                              ))
                            )}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {activeTab === "table" && (
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-4">ตารางข้อมูล</h2>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                วันที่
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                อัตราแลกเปลี่ยน (บาท/ดอลลาร์)
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {displayData.map((item, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.period}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                                  {item.rate.toFixed(4)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Filters and Sidebar */}
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">ตัวกรองข้อมูล</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewAllData(!viewAllData)}
                    className="text-xs px-2 py-1 h-auto"
                  >
                    {viewAllData ? "ดูข้อมูลที่กรอง" : "ดูข้อมูลทั้งหมด"}
                  </Button>
                </div>

                <div className="space-y-3">
                  {/* Primary period selection */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">ปี</label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={selectedYear || ""}
                        onChange={(e) => {
                          setSelectedYear(Number(e.target.value) || null)
                          setSelectedMonth(null)
                        }}
                        disabled={viewAllData}
                      >
                        <option value="">เลือกปี</option>
                        {Object.keys(availablePeriods).map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1">เดือน</label>
                      <select
                        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={selectedMonth || ""}
                        onChange={(e) => setSelectedMonth(Number(e.target.value) || null)}
                        disabled={!selectedYear || viewAllData}
                      >
                        <option value="">เลือกเดือน</option>
                        {selectedYear &&
                          availablePeriods[selectedYear]?.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* Comparison options */}
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium mb-2">ตัวเลือกการเปรียบเทียบ</h4>

                    <div className="space-y-2">
                      {/* Previous year comparison */}
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="compare-prev-year"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                          checked={comparePrevYear}
                          onChange={(e) => setComparePrevYear(e.target.checked)}
                          disabled={!selectedYear || !selectedMonth || viewAllData}
                        />
                        <label htmlFor="compare-prev-year" className="flex items-center text-xs">
                          <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: colors.prevYear }}></div>
                          เปรียบเทียบกับปีก่อนหน้า
                          {selectedYear && selectedMonth && (
                            <span className="ml-1 text-xs text-gray-500">
                              ({selectedYear - 1}/{selectedMonth})
                            </span>
                          )}
                        </label>
                      </div>

                      {/* Custom comparison */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="compare-custom"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                            checked={compareCustom}
                            onChange={(e) => setCompareCustom(e.target.checked)}
                            disabled={!selectedYear || !selectedMonth || viewAllData}
                          />
                          <label htmlFor="compare-custom" className="flex items-center text-xs">
                            <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: colors.custom }}></div>
                            เปรียบเทียบกับช่วงเวลาที่กำหนดเอง
                          </label>
                        </div>

                        {compareCustom && (
                          <div className="grid grid-cols-2 gap-2 pl-5 mt-1">
                            <div>
                              <label className="block text-xs font-medium mb-1">ปี</label>
                              <select
                                className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={customCompYear || ""}
                                onChange={(e) => {
                                  setCustomCompYear(Number(e.target.value) || null)
                                  setCustomCompMonth(null)
                                }}
                              >
                                <option value="">เลือกปี</option>
                                {Object.keys(availablePeriods).map((year) => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-medium mb-1">เดือน</label>
                              <select
                                className="w-full border border-gray-300 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={customCompMonth || ""}
                                onChange={(e) => setCustomCompMonth(Number(e.target.value) || null)}
                                disabled={!customCompYear}
                              >
                                <option value="">เลือกเดือน</option>
                                {customCompYear &&
                                  availablePeriods[customCompYear]?.map((month) => (
                                    <option key={month} value={month}>
                                      {month}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* Quick stats */}
              {displayData.length > 0 && (
                <div className="bg-white shadow-md rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-3">สถิติสรุป</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">อัตราสูงสุด:</span>
                      <span className="font-medium">
                        {Math.max(...displayData.map((item) => item.rate)).toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">อัตราต่ำสุด:</span>
                      <span className="font-medium">
                        {Math.min(...displayData.map((item) => item.rate)).toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">อัตราเฉลี่ย:</span>
                      <span className="font-medium">
                        {(displayData.reduce((sum, item) => sum + item.rate, 0) / displayData.length).toFixed(4)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ความผันผวน:</span>
                      <span className="font-medium">
                        {(
                          Math.max(...displayData.map((item) => item.rate)) -
                          Math.min(...displayData.map((item) => item.rate))
                        ).toFixed(4)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Exchange rate info */}
              <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3">ปัจจัยที่มีผลต่ออัตราแลกเปลี่ยน</h2>
                <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                  <li>นโยบายการเงินของธนาคารกลาง</li>
                  <li>อัตราเงินเฟ้อและอัตราดอกเบี้ย</li>
                  <li>สถานการณ์เศรษฐกิจโลก</li>
                  <li>ความเชื่อมั่นของนักลงทุน</li>
                  <li>ปัจจัยทางการเมืองและภูมิรัฐศาสตร์</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ExchangeDashboard
