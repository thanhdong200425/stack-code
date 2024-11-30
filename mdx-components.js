export function useMDXComponents(components) {
    return {
        h1: ({ children }) => (
            <h1
                style={{
                    fontSize: "3.75rem",
                    lineHeight: 1,
                    color: "#1a202c", // Darker gray for better contrast
                    fontWeight: "bold",
                    marginBottom: "1rem",
                }}
            >
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2
                style={{
                    fontSize: "3rem",
                    lineHeight: 1,
                    color: "#2d3748",
                    fontWeight: "bold",
                    marginBottom: "0.75rem",
                }}
            >
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3
                style={{
                    fontSize: "2.25rem",
                    lineHeight: "2.5rem",
                    color: "#4a5568",
                    marginBottom: "0.5rem",
                }}
            >
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4
                style={{
                    fontSize: "1.875rem",
                    lineHeight: "2.25rem",
                    color: "#718096",
                    marginBottom: "0.5rem",
                }}
            >
                {children}
            </h4>
        ),
        h5: ({ children }) => (
            <h5
                style={{
                    fontSize: "1.5rem",
                    lineHeight: "2rem",
                    color: "#a0aec0",
                    marginBottom: "0.5rem",
                }}
            >
                {children}
            </h5>
        ),
        h6: ({ children }) => (
            <h6
                style={{
                    fontSize: "1.25rem",
                    lineHeight: "1.75rem",
                    color: "#cbd5e0",
                    marginBottom: "0.5rem",
                }}
            >
                {children}
            </h6>
        ),
        ul: ({ children }) => (
            <ul
                style={{
                    listStyleType: "disc",
                    paddingLeft: "1.5rem",
                    margin: "1rem 0",
                    color: "#4a5568",
                }}
            >
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol
                style={{
                    listStyleType: "decimal",
                    paddingLeft: "1.5rem",
                    margin: "1rem 0",
                    color: "#4a5568",
                }}
            >
                {children}
            </ol>
        ),
        li: ({ children }) => (
            <li
                style={{
                    margin: "0.5rem 0",
                    padding: "0.2rem 0.5rem",
                    borderRadius: "5px",
                    transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#edf2f7")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
                {children}
            </li>
        ),
        code: ({ children }) => (
            <code
                style={{
                    backgroundColor: "#edf2f7",
                    borderRadius: "5px",
                    padding: "0.2rem 0.4rem",
                    fontFamily: "'Fira Code', monospace",
                    fontSize: "1rem",
                    color: "#d63384",
                    border: "1px solid #e2e8f0",
                }}
            >
                {children}
            </code>
        ),
        pre: ({ children }) => (
            <pre
                style={{
                    backgroundColor: "#1a202c",
                    borderRadius: "10px",
                    padding: "1rem",
                    overflowX: "auto",
                    fontFamily: "'Fira Code', monospace",
                    fontSize: "1rem",
                    color: "#e2e8f0",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
            >
                {children}
            </pre>
        ),
        strong: ({ children }) => <strong style={{ fontWeight: "bold" }}>{children}</strong>,
        ...components,
    };
}
