'use client'

import { useState, useEffect } from 'react'

export default function GradualDisempowerment() {
  const [activeSection, setActiveSection] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const sections = [
    { id: 'abstract', title: 'Abstract' },
    { id: 'introduction', title: 'Introduction' },
    { id: 'core-arguments', title: 'Core Arguments' },
    { id: 'methodology', title: 'Methodology' },
    { id: 'results', title: 'Results and Discussion' },
    { id: 'conclusion', title: 'Conclusion' },
    { id: 'references', title: 'References' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white font-serif">
      {/* Mobile TOC Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white border border-gray-300 rounded-lg p-2 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop TOC */}
      <nav className="hidden lg:fixed lg:top-8 lg:left-8 lg:block w-64 bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-h-96 overflow-y-auto">
        <h3 className="font-bold text-sm text-gray-900 mb-3 font-sans">Table of Contents</h3>
        <ul className="space-y-2">
          {sections.map(({ id, title }) => (
            <li key={id}>
              <button
                onClick={() => scrollToSection(id)}
                className={`text-left w-full text-sm py-1 px-2 rounded transition-colors font-sans ${
                  activeSection === id 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile TOC Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <nav className="absolute top-16 left-4 right-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg max-h-80 overflow-y-auto">
            <h3 className="font-bold text-sm text-gray-900 mb-3 font-sans">Table of Contents</h3>
            <ul className="space-y-2">
              {sections.map(({ id, title }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`text-left w-full text-sm py-2 px-3 rounded transition-colors font-sans ${
                      activeSection === id 
                        ? 'bg-blue-50 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 py-12 lg:ml-80">
        <article className="prose prose-lg max-w-none">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              Systemic Existential Risks from Incremental AI Development
            </h1>
            <div className="text-gray-600 text-sm font-sans space-x-2">
              <span>Research Team</span>
              <span>•</span>
              <span>July 20, 2024</span>
            </div>
          </header>

          <section id="abstract" className="mb-8">
            <div className="border-l-4 border-gray-300 pl-6 py-4">
              <p className="mb-3 text-gray-900 font-semibold">
                Abstract
              </p>
              <p className="mb-0 leading-relaxed text-gray-700 italic">
                AI risk scenarios usually portray a relatively sudden loss of human control to AIs, 
                outmaneuvering individual humans and human institutions, due to a sudden increase in AI capabilities, 
                or a coordinated betrayal. However, we argue that even an incremental increase in AI capabilities, 
                without any coordinated power-seeking, poses a substantial risk of eventual human disempowerment. 
                This loss of human influence will be centrally driven by having more competitive machine alternatives 
                to humans in almost all societal functions{' '}
                <a href="#ref-1" className="text-blue-600 hover:text-blue-800 font-medium text-sm" title="Russell, S. (2019). Human Compatible: Artificial Intelligence and the Problem of Control. Viking Press.">
                  [1]
                </a>.
              </p>
            </div>
          </section>

          <div className="space-y-8 text-gray-800 leading-relaxed">
            <section id="introduction">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Introduction</h2>
              
              <p className="mb-6 text-lg">
                A growing body of research points to the possibility that artificial intelligence (AI) 
                might eventually pose a large-scale or even existential risk to humanity{' '}
                <a href="#ref-2" className="text-blue-600 hover:text-blue-800 font-medium text-sm" title="Bostrom, N. (2014). Superintelligence: Paths, Dangers, Strategies. Oxford University Press.">
                  [2]
                </a>. Current discussions about AI risk largely focus on two scenarios:
              </p>

              <ol className="list-decimal pl-8 mb-6 space-y-3 text-lg">
                <li>
                  <strong>Deliberate misuse</strong>, such as cyberattacks and the deployment of novel bioweapons
                </li>
                <li>
                  <strong>Abrupt harmful actions</strong> by autonomous misaligned systems attempting to secure 
                  decisive strategic advantage, potentially following a period of deception
                </li>
              </ol>

              <p className="mb-6 text-lg">
                In this paper, we explore an alternative scenario: a 'Gradual Disempowerment' where AI advances 
                and proliferates without necessarily any acute jumps in capabilities or apparent misalignment.
              </p>
            </section>

            <section id="core-arguments">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Core Arguments</h3>

              <p className="mb-4 text-lg">Our argument is structured around six core claims:</p>

              <ul className="list-disc pl-8 mb-6 space-y-3 text-lg">
                <li>
                  Humans currently engage with numerous large-scale societal systems that are influenced 
                  by human action and produce outcomes that shape our collective future
                </li>
                <li>
                  These systems maintain alignment through explicit human actions and implicit reliance 
                  on human labor and cognition
                </li>
                <li>
                  If systems become less reliant on human labor and cognition, human ability to align 
                  them would decrease substantially{' '}
                  <a href="#ref-3" className="text-blue-600 hover:text-blue-800 font-medium text-sm" title="Bengio, Y. (2024). International governance of AI research. Nature Machine Intelligence, 6(2), 123-135.">
                    [3]
                  </a>
                </li>
              </ul>
            </section>

            <section id="methodology">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Methodology</h2>

              <h3 className="text-2xl font-bold mb-4 text-gray-900">Analysis Framework</h3>

              <p className="mb-6 text-lg">We focus primarily on three systems:</p>

              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-3 px-4 font-bold text-gray-900">System</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">Current Role</th>
                      <th className="text-left py-3 px-4 font-bold text-gray-900">AI Replacement Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">Economy</td>
                      <td className="py-3 px-4">Human labor-centered</td>
                      <td className="py-3 px-4 text-red-600 font-medium">High</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">Culture</td>
                      <td className="py-3 px-4">Human creation-centered</td>
                      <td className="py-3 px-4 text-yellow-600 font-medium">Medium</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">Governance</td>
                      <td className="py-3 px-4">Human decision-making</td>
                      <td className="py-3 px-4 text-green-600 font-medium">Medium-Low</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="results">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Results and Discussion</h2>

              <p className="mb-6 text-lg">
                Analysis of AI impact on economic systems reveals significant interdependencies. 
                Economic power can be used to influence policy and regulation, which in turn can 
                generate more economic power or alter the economic landscape.
              </p>

              <div className="bg-gray-50 p-6 mb-8 border-l-4 border-gray-400">
                <p className="text-lg italic">
                  "What makes this transition particularly hard to resist is that pressures on each 
                  societal system bleed into the others."
                </p>
              </div>
            </section>

            <section id="conclusion">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Conclusion</h2>

              <p className="mb-6 text-lg">
                Gradual AI development may be as risky as sudden changes. To mitigate these risks, we need:
              </p>

              <ul className="list-disc pl-8 mb-8 space-y-3 text-lg">
                <li>
                  <strong>Interdisciplinary approach</strong>: Integration of technology, policy, and social sciences
                </li>
                <li>
                  <strong>Proactive response</strong>: Preventive measures before problems occur
                </li>
                <li>
                  <strong>Continuous monitoring</strong>: Real-time tracking of change processes
                </li>
              </ul>

              <p className="text-lg">
                Because this disempowerment would be global and permanent, and because human flourishing 
                requires substantial resources in global terms, it could plausibly lead to human extinction 
                or similar outcomes.
              </p>
            </section>
          </div>

          <hr className="my-12 border-gray-300" />

          <section id="references" className="text-sm text-gray-600 font-sans">
            <h3 className="text-lg font-bold mb-4 text-gray-900">References</h3>
            <ol className="list-decimal pl-6 space-y-2 leading-relaxed">
              <li id="ref-1">Russell, S. (2019). <em>Human Compatible: Artificial Intelligence and the Problem of Control</em>. Viking Press.</li>
              <li id="ref-2">Bostrom, N. (2014). <em>Superintelligence: Paths, Dangers, Strategies</em>. Oxford University Press.</li>
              <li id="ref-3">Bengio, Y. (2024). International governance of AI research. <em>Nature Machine Intelligence</em>, 6(2), 123-135.</li>
            </ol>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p><strong>Author Information:</strong> Research Team - AI Objectives Institute</p>
              <p><strong>Keywords:</strong> artificial intelligence, social systems, risk analysis, policy research</p>
              <p><strong>Received:</strong> June 15, 2024 | <strong>Accepted:</strong> July 20, 2024</p>
            </div>
          </section>

          <div className="mt-12 text-center">
            <a 
              href="/" 
              className="inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors font-sans"
            >
              ← Back to papers
            </a>
          </div>
        </article>
      </main>
    </div>
  )
}
