import { Lock, Unlock, Sparkles, ShieldCheck, Shuffle, Zap, Brain, Grid3x3 } from 'lucide-react';

export default function ConceptShowcase() {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            The Encryption Process
          </h2>
          <p className="text-lg text-slate-300">
            Position-based cipher meets visual transformation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/30 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-slate-700/50 hover:border-cyan-500/40 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 p-4 rounded-2xl border border-cyan-500/30">
                <Lock className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Encrypted State</h3>
                <p className="text-xs text-cyan-400 font-mono mt-1">SECURE_STATUS: LOCKED</p>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-2xl p-6 border border-cyan-500/20 mb-6 min-h-40 flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p
                className="text-cyan-300 font-mono text-lg text-center relative z-10"
                style={{
                  direction: 'rtl',
                  transform: 'scaleY(-1)',
                  letterSpacing: '0.15em',
                }}
              >
                ...ETON TERCES YM SI SIHT
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Shuffle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-300">Reversed character order</p>
              </div>
              <div className="flex items-start gap-3">
                <Grid3x3 className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-300">Position-based Caesar cipher shift</p>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-300">Right-to-left display and vertical flip</p>
              </div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/30 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-slate-700/50 hover:border-green-500/40 transition-all duration-500 hover:shadow-lg hover:shadow-green-500/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 p-4 rounded-2xl border border-green-500/30">
                <Unlock className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Decrypted State</h3>
                <p className="text-xs text-green-400 font-mono mt-1">SECURE_STATUS: UNLOCKED</p>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-2xl p-6 border border-green-500/20 mb-6 min-h-40 flex items-center justify-center relative overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p className="text-white text-lg text-center relative z-10 font-medium">
                THIS IS MY SECRET NOTE...
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Brain className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-300">Hover proximity triggers decryption</p>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-300">Smooth animated transformation</p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-300">Full message readability restored</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-800/40 via-slate-800/20 to-slate-900/10 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/30 text-center hover:border-cyan-500/30 transition-all duration-300 group">
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-cyan-500/30 group-hover:border-cyan-500/60 transition-all">
              <Shuffle className="w-7 h-7 text-cyan-400" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Position Cipher</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Each character shifted by its position. 1st letter = +1, 2nd = +2, creating unique encryption per message.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/40 via-slate-800/20 to-slate-900/10 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/30 text-center hover:border-cyan-500/30 transition-all duration-300 group">
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-cyan-500/30 group-hover:border-cyan-500/60 transition-all">
              <Sparkles className="w-7 h-7 text-cyan-400" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Hover Detection</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Proximity-based unlock system. Get close enough and the text gradually reveals with visual feedback.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/40 via-slate-800/20 to-slate-900/10 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/30 text-center hover:border-cyan-500/30 transition-all duration-300 group">
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-cyan-500/30 group-hover:border-cyan-500/60 transition-all">
              <ShieldCheck className="w-7 h-7 text-cyan-400" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Playful Security</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Visual obfuscation for fun—not cryptographic. Perfect for brain-teasing note-taking experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
