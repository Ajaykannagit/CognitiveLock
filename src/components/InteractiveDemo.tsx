import { useState, useRef, useEffect } from 'react';
import { RotateCcw, Eye, Lock, Copy, Check, Clipboard, Keyboard, Save, Download, Upload, BarChart3, X } from 'lucide-react';

export default function InteractiveDemo() {
  const [inputText, setInputText] = useState(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('cognitive-lock-note');
    return saved || 'Try typing something secret...';
  });
  const [isLocked, setIsLocked] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoverStrength, setHoverStrength] = useState(0);
  const [unlockedMessage, setUnlockedMessage] = useState('');
  const [copiedEncrypted, setCopiedEncrypted] = useState(false);
  const [copiedDecrypted, setCopiedDecrypted] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const transformText = (text: string): string => {
    let charIndex = 0;
    return text
      .split('')
      .reverse()
      .map(char => {
        if (char === ' ') {
          charIndex++;
          return ' ';
        }
        const code = char.charCodeAt(0);
        const isLowercase = code >= 97 && code <= 122;
        const isUppercase = code >= 65 && code <= 90;

        if (isLowercase || isUppercase) {
          charIndex++;
          const shift = charIndex % 26;
          const base = isLowercase ? 97 : 65;
          const newChar = String.fromCharCode(((code - base + shift) % 26) + base);
          return newChar;
        }
        charIndex++;
        return char;
      })
      .join('');
  };

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const distance = Math.sqrt(x * x + y * y);
    const strength = Math.max(0, 100 - distance / 5);
    setHoverStrength(strength);

    if (strength > 60 && isLocked) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsLocked(false);
        setUnlockedMessage(inputText);
        setIsAnimating(false);
      }, 600);
    }
  };

  const handleMouseLeave = () => {
    setHoverStrength(0);
  };

  const handleReLock = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLocked(true);
      setUnlockedMessage('');
      setIsAnimating(false);
    }, 600);
  };

  const reverseTransformText = (text: string): string => {
    // First reverse to match encryption order (encryption reverses first)
    const reversed = text.split('').reverse();
    let charIndex = 0;
    
    // Apply reverse shift (same position logic as encryption)
    const unshifted = reversed.map(char => {
      if (char === ' ') {
        charIndex++;
        return ' ';
      }
      const code = char.charCodeAt(0);
      const isLowercase = code >= 97 && code <= 122;
      const isUppercase = code >= 65 && code <= 90;

      if (isLowercase || isUppercase) {
        charIndex++;
        const shift = charIndex % 26;
        const base = isLowercase ? 97 : 65;
        // Reverse the shift: subtract instead of add
        const newChar = String.fromCharCode(((code - base - shift + 26 * 100) % 26) + base);
        return newChar;
      }
      charIndex++;
      return char;
    });
    
    // Reverse back to original order
    return unshifted.reverse().join('');
  };

  const handleCopyEncrypted = async () => {
    try {
      const encrypted = transformText(inputText);
      await navigator.clipboard.writeText(encrypted);
      setCopiedEncrypted(true);
      setTimeout(() => setCopiedEncrypted(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopyDecrypted = async () => {
    try {
      await navigator.clipboard.writeText(displayText);
      setCopiedDecrypted(true);
      setTimeout(() => setCopiedDecrypted(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handlePasteEncrypted = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const decrypted = reverseTransformText(text);
      setInputText(decrypted);
      setUnlockedMessage(decrypted);
      setIsLocked(false);
      showNotification('Encrypted text decrypted successfully!', 'success');
    } catch (err) {
      console.error('Failed to paste:', err);
      showNotification('Failed to paste encrypted text', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = () => {
    try {
      localStorage.setItem('cognitive-lock-note', inputText);
      showNotification('Note saved to browser storage!', 'success');
    } catch (err) {
      showNotification('Failed to save note', 'error');
    }
  };

  const handleExport = () => {
    try {
      const encrypted = transformText(inputText);
      const data = {
        encrypted: encrypted,
        decrypted: inputText,
        timestamp: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cognitive-lock-note-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showNotification('Note exported successfully!', 'success');
    } catch (err) {
      showNotification('Failed to export note', 'error');
    }
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.decrypted) {
          setInputText(data.decrypted);
          setUnlockedMessage(data.decrypted);
          setIsLocked(false);
          showNotification('Note imported successfully!', 'success');
        } else if (data.encrypted) {
          const decrypted = reverseTransformText(data.encrypted);
          setInputText(decrypted);
          setUnlockedMessage(decrypted);
          setIsLocked(false);
          showNotification('Encrypted note imported and decrypted!', 'success');
        }
      } catch (err) {
        showNotification('Invalid file format', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  const getStats = () => {
    const text = inputText.trim();
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const chars = text.length;
    const encrypted = transformText(inputText).length;
    const encryptionRatio = chars > 0 ? ((encrypted / chars) * 100).toFixed(1) : '0';
    
    return {
      characters: chars,
      words: words.length,
      encryptedLength: encrypted,
      encryptionRatio,
      isLocked,
    };
  };

  // Auto-save to localStorage when text changes
  useEffect(() => {
    if (inputText && inputText !== 'Try typing something secret...') {
      const timer = setTimeout(() => {
        localStorage.setItem('cognitive-lock-note', inputText);
      }, 1000); // Debounce saves
      return () => clearTimeout(timer);
    }
  }, [inputText]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to toggle lock
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isLocked) {
          // Simulate hover to unlock
          setHoverStrength(100);
          setTimeout(() => {
            setIsAnimating(true);
            setTimeout(() => {
              setIsLocked(false);
              setUnlockedMessage(inputText);
              setIsAnimating(false);
            }, 600);
          }, 100);
        } else {
          setIsAnimating(true);
          setTimeout(() => {
            setIsLocked(true);
            setUnlockedMessage('');
            setIsAnimating(false);
          }, 600);
        }
      }
      // Ctrl/Cmd + Shift + C to copy encrypted
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        const encrypted = transformText(inputText);
        navigator.clipboard.writeText(encrypted).then(() => {
          setCopiedEncrypted(true);
          setTimeout(() => setCopiedEncrypted(false), 2000);
        }).catch(() => {});
      }
      // Ctrl/Cmd + Shift + V to paste encrypted
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        navigator.clipboard.readText().then((text) => {
          const decrypted = reverseTransformText(text);
          setInputText(decrypted);
          setUnlockedMessage(decrypted);
          setIsLocked(false);
        }).catch(() => {});
      }
      // Escape to re-lock
      if (e.key === 'Escape' && !isLocked) {
        setIsAnimating(true);
        setTimeout(() => {
          setIsLocked(true);
          setUnlockedMessage('');
          setIsAnimating(false);
        }, 600);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, inputText]);

  const encryptedText = transformText(inputText);
  const displayText = isLocked ? encryptedText : unlockedMessage;

  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Dual View Transform
          </h2>
          <p className="text-lg text-slate-300">
            See your message encrypted and decrypted side by side
          </p>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-slate-700/50 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-bold text-slate-200 tracking-wider">
                  INPUT YOUR MESSAGE
                </label>
                <button
                  onClick={() => setShowShortcuts(!showShortcuts)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50 rounded-lg text-slate-300 text-xs font-medium transition-all"
                  title="Keyboard shortcuts"
                >
                  <Keyboard className="w-3 h-3" />
                  <span>Shortcuts</span>
                </button>
              </div>
              {showShortcuts && (
                <div className="mb-4 p-4 bg-slate-900/80 rounded-xl border border-cyan-500/30 backdrop-blur-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>Toggle Lock:</span>
                      <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono">Ctrl/Cmd + K</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Copy Encrypted:</span>
                      <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono">Ctrl/Cmd + Shift + C</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Paste & Decrypt:</span>
                      <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono">Ctrl/Cmd + Shift + V</kbd>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Re-lock:</span>
                      <kbd className="px-2 py-1 bg-slate-800 rounded border border-slate-700 font-mono">Esc</kbd>
                    </div>
                  </div>
                </div>
              )}
              <textarea
                ref={textareaRef}
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (!isLocked) {
                    setUnlockedMessage(e.target.value);
                  }
                }}
                className="w-full bg-slate-900/60 text-white rounded-2xl px-6 py-4 border border-slate-600/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all outline-none resize-none h-28 text-base backdrop-blur-sm placeholder-slate-500"
                placeholder="Enter your secret message..."
              />

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-lg text-cyan-300 text-xs font-medium transition-all"
                  title="Save to browser storage"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg text-blue-300 text-xs font-medium transition-all"
                  title="Export note as JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
                <button
                  onClick={handleImport}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 rounded-lg text-purple-300 text-xs font-medium transition-all"
                  title="Import note from file"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleFileImport}
                  className="hidden"
                />
                <button
                  onClick={() => setShowStats(!showStats)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs font-medium transition-all"
                  title="View statistics"
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Stats</span>
                </button>
              </div>

              {showStats && (
                <div className="mt-4 p-4 bg-slate-900/80 rounded-xl border border-emerald-500/30 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-emerald-300">Statistics</h4>
                    <button
                      onClick={() => setShowStats(false)}
                      className="text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div>
                      <div className="text-slate-400 mb-1">Characters</div>
                      <div className="text-white font-bold text-lg">{getStats().characters}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 mb-1">Words</div>
                      <div className="text-white font-bold text-lg">{getStats().words}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 mb-1">Encrypted</div>
                      <div className="text-white font-bold text-lg">{getStats().encryptedLength}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 mb-1">Status</div>
                      <div className={`font-bold text-lg ${isLocked ? 'text-cyan-400' : 'text-emerald-400'}`}>
                        {isLocked ? '🔒 Locked' : '🔓 Unlocked'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-12 grid md:grid-cols-2 gap-6">
                <div className="relative" ref={containerRef} onMouseMove={handleHover} onMouseLeave={handleMouseLeave}>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-bold text-slate-300 tracking-wider">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-cyan-400" />
                        ENCRYPTED STATE
                      </div>
                    </label>
                    {hoverStrength > 0 && (
                      <div className="text-xs text-cyan-400 font-mono animate-pulse">
                        {Math.round(hoverStrength)}% PROXIMITY
                      </div>
                    )}
                  </div>

                  <div
                    className={`w-full bg-gradient-to-br from-slate-900/80 to-slate-950/60 rounded-2xl px-6 py-8 border-2 min-h-56 flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-600 relative overflow-hidden ${
                      isLocked
                        ? 'border-cyan-500/40 shadow-lg shadow-cyan-500/20 hover:border-cyan-400/60'
                        : 'border-cyan-500/20 shadow-lg shadow-cyan-500/5'
                    }`}
                  >
                    {isLocked && (
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-cyan-500/10 to-transparent transition-opacity"
                        style={{ opacity: hoverStrength / 150 }}
                      ></div>
                    )}

                    <div
                      className={`w-full transition-all duration-600 relative z-10 text-center break-words ${
                        isAnimating ? 'scale-95 opacity-30' : 'scale-100 opacity-100'
                      } text-cyan-300 font-mono tracking-wider leading-relaxed text-lg`}
                      style={{
                        direction: 'rtl',
                        transform: 'scaleY(-1)',
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        filter: isLocked ? `blur(${Math.max(0, 2.5 - hoverStrength / 25)}px)` : 'blur(0px)',
                      }}
                    >
                      {encryptedText || 'awaiting input...'}
                    </div>

                    <div className="mt-6 flex gap-3 relative z-20">
                      <button
                        onClick={handleCopyEncrypted}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-lg text-cyan-300 text-xs font-medium transition-all"
                        title="Copy encrypted cipher"
                      >
                        {copiedEncrypted ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={handlePasteEncrypted}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-300 text-xs font-medium transition-all"
                        title="Paste encrypted cipher to decrypt"
                      >
                        <Clipboard className="w-3 h-3" />
                        <span>Paste & Decrypt</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <RotateCcw className="w-3 h-3" />
                    <span className="font-mono">
                      {isLocked ? 'Hover to reveal • Copy or paste' : 'Ready to share or decrypt'}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-bold text-slate-300 tracking-wider">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-teal-400" />
                        DECRYPTED VIEW
                      </div>
                    </label>
                    {!isLocked && (
                      <span className="text-xs text-teal-400 font-mono animate-pulse">
                        REVEALED
                      </span>
                    )}
                  </div>

                  <div
                    className={`w-full bg-gradient-to-br from-slate-900/80 to-slate-950/60 rounded-2xl px-6 py-8 border-2 min-h-56 flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-600 relative overflow-hidden ${
                      !isLocked
                        ? 'border-teal-500/40 shadow-lg shadow-teal-500/20'
                        : 'border-slate-700/30 shadow-lg shadow-slate-700/5'
                    }`}
                  >
                    <div
                      className={`w-full transition-all duration-600 relative z-10 text-center break-words ${
                        isAnimating ? 'scale-95 opacity-30' : 'scale-100 opacity-100'
                      } leading-relaxed text-lg font-medium`}
                      style={{
                        filter: !isLocked ? 'blur(0px)' : 'blur(8px)',
                        transition: 'filter 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        color: !isLocked ? '#d1d5db' : '#64748b',
                      }}
                    >
                      {!isLocked ? displayText || 'message ready...' : 'Locked • Hover on encrypted side to unlock'}
                    </div>

                    {!isLocked && (
                      <button
                        onClick={handleCopyDecrypted}
                        className="mt-6 flex items-center gap-2 px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 rounded-lg text-teal-300 text-xs font-medium transition-all relative z-20"
                        title="Copy decrypted message"
                      >
                        {copiedDecrypted ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Original</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Lock className="w-3 h-3" />
                    <span className="font-mono">
                      {!isLocked ? 'Message decrypted' : 'Encrypted and blurred'}
                    </span>
                  </div>
                </div>
              </div>

              {!isLocked && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleReLock}
                    className="group flex items-center gap-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 border border-slate-600/50 hover:border-slate-500"
                  >
                    <Lock className={`w-4 h-4 transition-transform ${isAnimating ? 'animate-spin' : 'group-hover:rotate-12'}`} />
                    <span>Re-encrypt Message</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div
            className={`px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border animate-scale-in ${
              notification.type === 'success'
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200'
                : 'bg-red-500/20 border-red-500/50 text-red-200'
            }`}
          >
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <Check className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
              <span className="font-medium">{notification.message}</span>
              <button
                onClick={() => setNotification(null)}
                className="ml-4 text-current opacity-70 hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
