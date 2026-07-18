import { useState, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { ChevronDown } from 'lucide-react'
import { useSession } from '../context/SessionContext'

const LANGUAGES = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
    { label: 'C#', value: 'csharp' },
]

const FILE_EXTENSIONS: Record<string, string> = {
    javascript: 'js', typescript: 'ts', python: 'py',
    java: 'java', cpp: 'cpp', go: 'go', rust: 'rs', csharp: 'cs'
}

const STARTER_CODE: Record<string, string> = {
    javascript: '// Write your solution here\nfunction solution() {\n  \n}\n',
    typescript: '// Write your solution here\nfunction solution(): void {\n  \n}\n',
    python: '# Write your solution here\ndef solution():\n    pass\n',
    java: '// Write your solution here\nclass Solution {\n    public void solution() {\n        \n    }\n}\n',
    cpp: '// Write your solution here\n#include <iostream>\nusing namespace std;\n\nvoid solution() {\n    \n}\n',
    go: '// Write your solution here\npackage main\n\nfunc solution() {\n\t\n}\n',
    rust: '// Write your solution here\nfn solution() {\n    \n}\n',
    csharp: '// Write your solution here\npublic class Solution {\n    public void Run() {\n        \n    }\n}\n',
}

// How long to wait after the last keystroke before sending to Gemini (ms)
const CODE_DEBOUNCE_MS = 2000

export default function CodeEditor() {
    const { sendCodeUpdate } = useSession()
    const [selectedLang, setSelectedLang] = useState('javascript')
    const [code, setCode] = useState(STARTER_CODE['javascript'])
    const [langDropdownOpen, setLangDropdownOpen] = useState(false)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleLangChange = (lang: string) => {
        setSelectedLang(lang)
        setCode(STARTER_CODE[lang] ?? '')
        setLangDropdownOpen(false)
    }

    // On every code change, debounce before sending so we don't spam Gemini
    // with every individual keystroke.
    const handleCodeChange = (val: string | undefined) => {
        const newCode = val ?? ''
        setCode(newCode)

        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => {
            sendCodeUpdate(newCode, selectedLang)
        }, CODE_DEBOUNCE_MS)
    }

    // Clear the debounce timer on unmount to prevent stale sends
    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [])

    const selectedLabel = LANGUAGES.find(l => l.value === selectedLang)?.label ?? 'JavaScript'
    const fileExt = FILE_EXTENSIONS[selectedLang] ?? 'js'

    return (
        <div id="code-editor-container" className="flex flex-col h-full w-full rounded-xl overflow-hidden border border-gray-800/60 bg-[#0d1117] shadow-2xl">

            {/* ── Toolbar ── */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-gray-800/60 shrink-0">

                {/* Left: Language selector */}
                <div className="relative">
                    <button
                        id="lang-selector-btn"
                        onClick={() => setLangDropdownOpen(prev => !prev)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-900 border border-gray-700/60 hover:border-gray-600 text-gray-300 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#00E599]" />
                        {selectedLabel}
                        <ChevronDown
                            size={12}
                            className={`text-gray-500 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {langDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1.5 z-50 w-40 rounded-lg bg-[#1c2128] border border-gray-700/60 shadow-2xl overflow-hidden">
                            {LANGUAGES.map(lang => (
                                <button
                                    key={lang.value}
                                    id={`lang-option-${lang.value}`}
                                    onClick={() => handleLangChange(lang.value)}
                                    className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors duration-150
                                        ${selectedLang === lang.value
                                            ? 'bg-[#00E599]/10 text-[#00E599]'
                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                        }`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Center: File name */}
                <span className="text-[11px] font-mono text-gray-600 tracking-widest select-none">
                    solution.{fileExt}
                </span>

                <div className="flex items-center gap-4">
                    {/* Placeholder to keep flex space if needed, or just remove */}
                </div>
            </div>

            {/* ── Monaco Editor ── */}
            <div className="flex-1 overflow-hidden">
                <Editor
                    height="100%"
                    language={selectedLang}
                    value={code}
                    onChange={handleCodeChange}
                    theme="vs-dark"
                    options={{
                        fontSize: 13,
                        fontFamily: '"Cascadia Code", "Fira Code", "JetBrains Mono", Menlo, Monaco, monospace',
                        fontLigatures: true,
                        lineHeight: 1.6,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        padding: { top: 16, bottom: 16 },
                        renderLineHighlight: 'gutter',
                        cursorBlinking: 'smooth',
                        cursorSmoothCaretAnimation: 'on',
                        smoothScrolling: true,
                        wordWrap: 'on',
                        automaticLayout: true,
                        tabSize: 2,
                        contextmenu: false,
                        quickSuggestions: true,
                        parameterHints: { enabled: true },
                    }}
                />
            </div>
        </div>
    )
}
