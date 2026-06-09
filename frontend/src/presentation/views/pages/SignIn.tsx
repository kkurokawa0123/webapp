import React, { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { PasswordField } from '@/presentation/views/shared/components/PasswordField'
import { SEVERITY } from '@/shared/constants/severity'
import { COMMON_ERROR_MESSAGES } from '@/shared/constants/common_error_message'
import { useMessageContext } from '@/presentation/contexts/message_context'
import { useAuthContex } from '@/presentation/contexts/auth_context'
import { useSingIn } from '@/presentation/hooks/auth_hook'
import { useLoadingContext } from '@/presentation/contexts/loding_context'
import { Email } from '@/domain/value_objects/auth/email'
import { Password } from '@/domain/value_objects/auth/password'
import { SignInParams } from '@/domain/entities/auth/sign_in_params'

// サインイン用ページ
const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const { isAuthenticated } = useAuthContex()
  const { showMessage } = useMessageContext()
  const { openLoading, closeLoading } = useLoadingContext()
  const singIn = useSingIn()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      openLoading()
      showMessage('ログインしています....しばらくお待ちください', SEVERITY.INFO)
      const params = SignInParams.create(new Email(form.email), new Password(form.password))
      await singIn.mutateAsync(params)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      navigate('/')
    } catch (err) {
      const message =
        err instanceof Error && err.message ? err.message : COMMON_ERROR_MESSAGES.UNEXPECTED_ERROR
      showMessage(message, SEVERITY.ERROR)
    } finally {
      closeLoading()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  return (
    <>
      <Box component="form" sx={{ display: 'flex' }}>
        <Card>
          <CardHeader title="ログイン" />
          <CardContent>
            <TextField
              name="email"
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={form.email}
              margin="dense"
              onChange={handleChange}
            />
            <PasswordField
              name="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!form.email || !form.password} // 空欄があった場合はボタンを押せないように
              onClick={handleSubmit}
            >
              実行
            </Button>
            <Box textAlign="center">
              <Typography variant="body2">
                会員登録がお済みでない場合 &nbsp;
                <Link to="/signup">会員登録はこちら</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
export default SignIn
