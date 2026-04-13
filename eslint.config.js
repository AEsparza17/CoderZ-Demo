import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Ignorar carpeta de distribución
  { ignores: ['dist'] },

  {
    // Aplicar a todos los archivos JS y JSX
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    // Configuración de React (versión automática)
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Reglas recomendadas base
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      
      // Reglas específicas de Vite
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 1. Apagar PropTypes: Vital para usar Shadcn en JS sin volverse loco
      'react/prop-types': 'off',
      // 2. Ignorar 'React is defined but never used' y argumentos con _
      'no-unused-vars': ['warn', { 
          'varsIgnorePattern': '^React$',
          'argsIgnorePattern': '^_' 
      }],
      // 3. Permitir escribir "Don't" sin escapar a &apos;
      'react/no-unescaped-entities': 'off',
    },
  },
]