import { PortableText, type PortableTextComponents } from "@portabletext/react"

const components: PortableTextComponents = {
    block: {
        h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">{children}</h3>,
        h4: ({ children }) => <h4 className="text-lg font-bold mt-6 mb-3 text-gray-900 dark:text-white">{children}</h4>,
        normal: ({ children }) => <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent-500 pl-4 italic my-6 text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 py-2 pr-2 rounded-r">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className="pl-1">{children}</li>,
        number: ({ children }) => <li className="pl-1">{children}</li>,
    },
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
            const target = !value.href.startsWith("/") ? "_blank" : undefined
            return (
                <a
                    href={value.href}
                    rel={rel}
                    target={target}
                    className="text-accent-600 hover:text-accent-700 decoration-accent-600/30 underline underline-offset-2 transition-colors"
                >
                    {children}
                </a>
            )
        },
        strong: ({ children }) => <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>,
        code: ({ children }) => (
            <code className="bg-gray-100 dark:bg-gray-800 rounded px-1.5 py-0.5 text-sm font-mono text-accent-600 dark:text-accent-400">
                {children}
            </code>
        ),
    },
}

export default function RichText({ value }: { value: any }) {
    if (!value) return null
    return <div className="rich-text-content"><PortableText value={value} components={components} /></div>
}
