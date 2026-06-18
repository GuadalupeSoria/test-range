import Link from "next/link"

const exercises = [
  {
    href: "/exercise1",
    title: "Exercise 1",
    description: "Normal range from a minimum to a maximum number, with editable labels.",
  },
  {
    href: "/exercise2",
    title: "Exercise 2",
    description: "Fixed number of options range.",
  },
]

export default function Home() {
  return (
    <main className="page">
      <div className="content" style={{ maxWidth: 672 }}>
        <h1 className="home-title">{"<Range />"}</h1>

        <div className="exercises">
          {exercises.map((ex) => (
            <Link key={ex.href} href={ex.href} className="exercise-card">
              <div>
                <h2>{ex.title}</h2>
                <p>{ex.description}</p>
              </div>
              <span className="exercise-footer">
                View <span className="exercise-arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
