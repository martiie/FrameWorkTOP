import React from "react"
import Layout from "../components/Layout"

interface SkillCategoryProps {
  title: string
  skills: string[]
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ title, skills }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div key={skill} className="border rounded-lg p-4 text-center">
            <p>{skill}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// interface ProgressBarProps {
//   skill: string
//   percentage: number
// }

// const ProgressBar: React.FC<ProgressBarProps> = ({ skill, percentage }) => {
//   return (
//     <div className="space-y-2">
//       <div className="flex justify-between">
//         <span>{skill}</span>
//         <span>{percentage}%</span>
//       </div>
//       <div className="w-full bg-muted rounded-full h-2.5">
//         <div className="bg-primary h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
//       </div>
//     </div>
//   )
// }

const Skills: React.FC = () => {
  const frontendSkills = [
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
  ]
  const backendSkills = [
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
  ]

  const toolsSkills = ["Python", "R", "SQL", "JavaScript"]
  const otherSkills = ["Teamwork", "Problem Solving", "Adaptability", "Critical Thinking", "Time Management"]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">ทักษะและความสามารถ</h1>

        {/* <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-center">
            ฉันมีความเชี่ยวชาญในเทคโนโลยีต่างๆ ดังนี้
          </p>
        </div> */}

        <div className="space-y-12">
          <SkillCategory title="TECHNIQUES & METHODS" skills={frontendSkills} />
          <SkillCategory title="TOOLS AND SOFTWARE" skills={backendSkills} />
          <SkillCategory title="PROGRAMMING LANGUAGES" skills={toolsSkills} />
          <SkillCategory title="OTHER SKILLS" skills={otherSkills} />

          {/* <div className="space-y-4">
            <h2 className="text-2xl font-semibold">ประกาศนียบัตรและการอบรม</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium">[ชื่อประกาศนียบัตร/การอบรม]</h3>
                <p className="text-muted-foreground">[ชื่อสถาบัน] • [ปีที่ได้รับ]</p>
                <p className="mt-2">[รายละเอียดเพิ่มเติมเกี่ยวกับประกาศนียบัตรหรือการอบรม]</p>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-medium">[ชื่อประกาศนียบัตร/การอบรม]</h3>
                <p className="text-muted-foreground">[ชื่อสถาบัน] • [ปีที่ได้รับ]</p>
                <p className="mt-2">[รายละเอียดเพิ่มเติมเกี่ยวกับประกาศนียบัตรหรือการอบรม]</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Layout>
  )
}

export default Skills
