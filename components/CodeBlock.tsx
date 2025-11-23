import React, { useState, useEffect } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { CodeBlockProps } from '@/types/types';

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript', filename, animate = false }) => {
  const [displayedCode, setDisplayedCode] = useState(animate ? '' : code);
  const [isTyping, setIsTyping] = useState(animate);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!animate) {
      setDisplayedCode(code);
      setIsTyping(false);
      return;
    }

    setDisplayedCode('');
    setIsTyping(true);

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentIndex < code.length) {
        currentIndex++;
        setDisplayedCode(code.slice(0, currentIndex));
        
        // Randomize typing speed to feel more natural (15ms - 50ms)
        // Add extra delay for spaces/newlines
        const char = code[currentIndex - 1];
        const isPause = /[\n\s]/.test(char);
        const delay = Math.random() * 35 + (isPause ? 30 : 15);
        
        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        setIsTyping(false);
      }
    };

    // Initial start delay
    timeoutId = setTimeout(typeNextChar, 500);

    return () => clearTimeout(timeoutId);
  }, [code, animate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic syntax highlighting simulation
  const renderCode = (text: string) => {
    const parts = text.split(/(\b(?:const|let|var|function|import|from|return|if|else|await|async|new|try|catch|class|interface|type)\b|'.*?'|".*?"|`.*?`|\/\/.*|\b\d+\b|[{}()[\],.])|(\s+)/g).filter(Boolean);
    
    return parts.map((part, i) => {
      if (/^(const|let|var|function|import|from|return|if|else|await|async|new|try|catch|class|interface|type)$/.test(part)) {
        return <span key={i} className="text-purple-400">{part}</span>;
      }
      if (/^('.*?'|".*?"|`.*?`)$/.test(part)) {
        return <span key={i} className="text-green-400">{part}</span>;
      }
      if (/^\/\/.*$/.test(part)) {
        return <span key={i} className="text-slate-500 italic">{part}</span>;
      }
      if (/^\d+$/.test(part)) {
        return <span key={i} className="text-orange-400">{part}</span>;
      }
      if (/^[A-Z][a-zA-Z0-9]*$/.test(part)) { // Basic heuristic for Types/Classes
         return <span key={i} className="text-yellow-300">{part}</span>;
      }
      if (/^[a-z]+\(/.test(part)) { // Function calls
         return <span key={i} className="text-blue-400">{part}</span>;
      }
      return <span key={i} className="text-slate-200">{part}</span>;
    });
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg">
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            {language === 'bash' ? <Terminal size={14} /> : <div className="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500/50" />}
            <span className="font-mono">{filename || language}</span>
          </div>
          <button 
            onClick={handleCopy}
            className="flex items-center gap-1.5 hover:text-slate-200 transition-colors focus:outline-none"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="font-mono text-sm leading-relaxed">
          <code>
            {language === 'bash' ? (
               <span className="text-slate-200">{displayedCode}</span>
            ) : (
               renderCode(displayedCode)
            )}
            {/* Cursor stays visible if animate is true, pulses when idle */}
            {(isTyping || animate) && (
              <span className={`inline-block w-2 h-5 bg-indigo-500 ml-0.5 align-middle ${!isTyping ? 'animate-pulse' : ''}`} />
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};