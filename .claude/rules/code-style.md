# Backend
- CommonJS only (require/module.exports), NO ES modules
- Always async/await with try/catch
- Variables: camelCase, Classes: PascalCase, DB columns: snake_case
- SQL: Always parameterized queries with ? placeholders
- Error responses: res.status(CODE).json({ error: 'message' })

# Frontend
- Functional components only, no class components
- useState + Context only, no Redux
- Tailwind inline classes, no separate CSS files
- Always use toast and modal instead of alert
- Import order: React → Router → Context → API → Icons → Components