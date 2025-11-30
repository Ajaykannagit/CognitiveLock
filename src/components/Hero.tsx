import { Lock, Brain, Sparkles, Zap, Cpu } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-50"></div>
            <Brain className="w-12 h-12 text-cyan-300 relative animate-pulse-slow" />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-50"></div>
            <Lock className="w-10 h-10 text-cyan-200 relative" />
          </div>
        </div>

        <div className="mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-sm">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300 font-medium">Neural Encryption</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-200 via-blue-300 to-cyan-200 bg-clip-text text-transparent animate-fade-in-up tracking-tight">
          Cognitive-Lock
          <span className="block text-5xl md:text-7xl mt-2 bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-300 bg-clip-text">Notes</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delay font-light">
          Your notes transform into algorithmic puzzles.
          <span className="block mt-3 text-cyan-300 font-medium">
            Encrypted by position. Visible only when you solve them.
          </span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 text-sm md:text-base animate-fade-in-up-delay-2">
          <div className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <Zap className="w-4 h-4 text-cyan-400 group-hover:animate-pulse" />
            <span className="text-slate-300">Algorithmically Private</span>
          </div>
          <div className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <Brain className="w-4 h-4 text-cyan-400 group-hover:animate-pulse" />
            <span className="text-slate-300">Brain-Teasing</span>
          </div>
          <div className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50 transition-all">
            <Sparkles className="w-4 h-4 text-cyan-400 group-hover:animate-pulse" />
            <span className="text-slate-300">Visually Encrypted</span>
          </div>
        </div>

        <div className="mt-16 animate-bounce-slow">
          <div className="w-1 h-16 bg-gradient-to-b from-cyan-400 via-cyan-400/50 to-transparent mx-auto rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
