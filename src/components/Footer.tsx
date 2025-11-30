import { Brain, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-cyan-400" />
            <Lock className="w-5 h-5 text-cyan-300" />
            <span className="text-white font-semibold text-lg">Cognitive-Lock Notes</span>
          </div>

          <p className="text-slate-400 text-sm text-center md:text-right">
            A playful way to keep your notes visually private.
            <span className="block mt-1 text-slate-500">
              Built for fun, creativity, and a little brain exercise.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
