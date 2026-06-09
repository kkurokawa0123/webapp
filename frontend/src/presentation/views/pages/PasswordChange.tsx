import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { PasswordField } from '@/presentation/views/shared/components/PasswordField'
import { SEVERITY } from '@/shared/constants/severity'
import { useMessageContext } from '@/presentation/contexts/message_context'
import { useLoadingContext } from '@/presentation/contexts/loding_context'
import { useAuthContex } from '@/presentation/contexts/auth_context'
import { useSingOut } from '@/presentation/hooks/auth_hook'
import { useUpdatePassword } from '@/presentation/hooks/password_hook'
import { Password } from '@/domain/value_objects/auth/password'
import { PasswordChangeParams } from '@/domain/entities/auth/password_change_params'
import { COMMON_ERROR_MESSAGES } from '@/shared/constants/common_error_message'

const PasswordChange: React.FC = () => {
  const navigate = useNavigate()
  const { openLoading, closeLoading } = useLoadingContext()
  const { showMessage } = useMessageContext()
  const { isAuthenticated } = useAuthContex()

  const singOut = useSingOut()
  const updatePassword = useUpdatePassword()

  if (!isAuthenticated) {
    navigate('/signin')
  }

  const [form, setForm] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      openLoading()
      showMessage('パスワード変更中....しばらくお待ちください', SEVERITY.INFO)
      const params = PasswordChangeParams.create(
        new Password(form.current_password),
        new Password(form.new_password),
        new Password(form.new_password_confirmation),
      )
      const message = await updatePassword.mutateAsync(params)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      if (message) {
        showMessage(message, SEVERITY.SUCCESS)
      }
      // パスワード変更後は、強制的にログアウトする。
      await singOut.mutateAsync()
    } catch (err) {
      const message =
        err instanceof Error && err.message ? err.message : COMMON_ERROR_MESSAGES.UNEXPECTED_ERROR
      showMessage(message, SEVERITY.ERROR)
    } finally {
      closeLoading()
    }
  }

  return (
    <>
      <Box component="form" sx={{ display: 'flex' }}>
        <Card>
          <CardHeader title="パスワード変更"></CardHeader>
          <CardContent>
            <PasswordField
              name="current_password"
              label="Current Password"
              value={form.current_password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <PasswordField
              name="new_password"
              label="New Password"
              value={form.new_password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            <PasswordField
              name="new_password_confirmation"
              label="New Password Confirmation"
              value={form.new_password_confirmation}
              onChange={handleChange}
              autoComplete="new-password-confirmation"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={
                !form.current_password || !form.new_password || !form.new_password_confirmation
              }
              onClick={handleSubmit}
            >
              実行
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
export default PasswordChange
