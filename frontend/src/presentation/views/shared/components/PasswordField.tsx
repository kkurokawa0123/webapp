import { useState } from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

type PasswordFieldProps = {
  name: string
  label: string
  value: string
  autoComplete?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PasswordField = ({
  name,
  label,
  value,
  autoComplete,
  onChange,
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <TextField
      variant="outlined"
      required
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      autoComplete={autoComplete}
      margin="dense"
      placeholder="At least 8 characters"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  )
}
