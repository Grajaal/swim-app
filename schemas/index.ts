import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'El correo electrónico es requerido.'
  }), 
  password: z.string().min(1, {
    message: 'La contraseña es requerida.'
  })
}) 

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre es requerido.'
  }),
  email: z.string().email({
    message: 'El correo electrónico es requerido.'
  }), 
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 carácteres.'
  }), 
  confirmPassword: z.string(), 
  role: z.enum(['swimmer', 'coach'], {
    message: 'Elige tu rol.'
  })
})