export default function Home() {
  return (
    <div className="min-h-screen bg-white font-serif">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">
            Academic Research Collection
          </h1>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto leading-relaxed">
            A curated collection of research papers on AI, social science, and future studies.
          </p>
          
          <div className="space-y-8">
            <article className="bg-white border border-gray-100 hover:shadow-sm transition-all duration-200">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-4 leading-tight">
                  <a href="/papers/gradual-disempowerment" className="text-gray-900 hover:text-blue-600 transition-colors">
                    Systemic Existential Risks from Incremental AI Development
                  </a>
                </h2>
                <div className="text-sm text-gray-500 mb-4 font-sans">
                  Research Team • July 20, 2024
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                  AI risk scenarios usually portray a relatively sudden loss of human control to AIs, 
                  outmaneuvering individual humans and human institutions. However, we argue that even 
                  an incremental increase in AI capabilities poses a substantial risk of eventual human disempowerment.
                </p>
                <div className="flex items-center">
                  <a 
                    href="/papers/gradual-disempowerment" 
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm font-sans"
                  >
                    Read full paper →
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  )
}
