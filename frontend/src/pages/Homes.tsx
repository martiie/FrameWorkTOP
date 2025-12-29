"use client"

import type React from "react"
import { useState } from "react"
import Layout from "../components/Layout"

interface Defect {
  x: number
  y: number
  w: number
  h: number
  area: number
  score: number
}

const Home: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [threshold, setThreshold] = useState<number>(0.5)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("threshold", threshold.toString())

    try {
      const res = await fetch("http://localhost:8000/infer", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Inference failed")
      }

      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">

        {/* Hero */}
        <section className="py-14 text-center">
          <h1 className="text-4xl font-bold mb-3">
            PaDiM Anomaly Detection
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload an image, adjust threshold, and run anomaly inference
          </p>
        </section>

        {/* Upload Card */}
        <section className="max-w-xl mx-auto bg-white dark:bg-zinc-900 shadow-md rounded-xl p-6 space-y-5 border">

          {/* File input */}
          <div>
            <label className="block mb-2 font-medium">
              Image File
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm file:mr-4 file:rounded file:border-0
                         file:bg-primary/10 file:px-4 file:py-2 file:text-primary
                         hover:file:bg-primary/20"
            />
            {file && (
              <p className="text-sm text-muted-foreground mt-1">
                {file.name}
              </p>
            )}
          </div>

          {/* Threshold */}
          <div>
            <label className="block mb-2 font-medium">
              Threshold: <span className="font-mono">{threshold.toFixed(2)}</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0.0</span>
              <span>1.0</span>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className="w-full bg-primary text-white py-2.5 rounded-lg
                       font-medium transition disabled:opacity-50
                       hover:bg-primary/90"
          >
            {loading ? "Running inference..." : "Run Inference"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}
        </section>

        {/* Result */}
        {result && (
          <section className="py-14">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Result
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

              {/* Heatmap */}
              <div className="space-y-3">
                <h3 className="font-semibold">Anomaly Heatmap</h3>
                <img
                  src={`data:image/png;base64,${result.heatmap_base64}`}
                  alt="heatmap"
                  className="rounded-lg border shadow"
                />
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div className="bg-muted/40 rounded-lg p-4 space-y-2">
                  <p><b>Filename:</b> {result.filename}</p>
                  <p><b>Threshold:</b> {threshold.toFixed(2)}</p>
                  <p><b>Defects detected:</b> {result.num_defects}</p>
                </div>

                {result.defects?.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Defect List</h4>
                    <ul className="text-sm space-y-1 max-h-60 overflow-auto border rounded p-2">
                      {result.defects.map((d: Defect, i: number) => (
                        <li key={i} className="font-mono">
                          #{i + 1} → x:{d.x} y:{d.y} w:{d.w} h:{d.h} score:{d.score.toFixed(3)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>
          </section>
        )}

      </div>
    </Layout>
  )
}

export default Home
