import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { indigo, pink } from '@mui/material/colors'
import { AuthProvider } from '@/presentation/views/providers/AuthProvider'
import { TodoFilterProvider } from '@/presentation/views/providers/TodoFilterProvider'
import CommonLayout from '@/presentation/views/layouts/CommonLayout'
import TodoMain from '@/presentation/views/pages/todos/TodoMain'
import SignIn from '@/presentation/views/pages/SignIn'
import SignUp from '@/presentation/views/pages/SignUp'
import PasswordChange from '@/presentation/views/pages/PasswordChange'
import { useAuthContex } from '@/presentation/contexts/auth_context'

// テーマを作成
const theme = createTheme({
  palette: {
    // プライマリーカラー
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    // ついでにセカンダリーカラーも v4 に戻す
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  },
})

const queryClient = new QueryClient()

const PrivateRoute = () => {
  const { isLoading, isAuthenticated } = useAuthContex()

  // console.log("AuthProvider-authData", authData);
  // console.log("AuthProvider-isAuthenticated", isAuthenticated);
  // console.log("AuthProvider useAuthContex completed");

  if (isLoading) return
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />
}

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <TodoFilterProvider>
          <AuthProvider>
            <CommonLayout>
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/todomain" element={<TodoMain />} />
                <Route path="/passwordchange" element={<PasswordChange />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<TodoMain />} />
                </Route>
              </Routes>
            </CommonLayout>
          </AuthProvider>
        </TodoFilterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
