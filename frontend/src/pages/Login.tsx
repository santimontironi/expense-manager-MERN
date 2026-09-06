import { useState, useEffect } from "react"
import { useLogin } from "../hooks/auth/useLogin"
import type { LoginCredentials } from "../types/auth.types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../../../shared/schemas/auth-schema.js"
import { useNavigate } from "react-router-dom"
import { useMe } from "../hooks/auth/useMe"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const { data: meData, isLoading: isMeLoading } = useMe()

  const { mutate: login, isPending: isLoginPending, error: loginError } = useLogin()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema)
  })

  const submitForm = (data: LoginCredentials) => {
    login(data)
  }

  useEffect(() => {
    if (!isMeLoading && meData) {
      navigate("/inicio")
    }
  }, [isMeLoading, meData, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary px-5 py-12">
      <div className="relative w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">

        <div className="relative z-10 rounded-3xl bg-primary shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3),0_45px_80px_-20px_rgba(0,0,0,0.55)] md:grid md:grid-cols-2">
          <div className="relative flex flex-col justify-center gap-6 border-b border-ink/10 px-8 py-14 md:border-b-0 md:border-r md:px-12 md:py-20 xl:px-16 xl:py-28 2xl:px-20">
            <span
              aria-hidden="true"
              className="absolute left-6 top-6 h-10 w-10 rounded-tl-xl border-l-[3px] border-t-[3px] border-secondary md:left-8 md:top-8 xl:left-10 xl:top-10 xl:h-12 xl:w-12"
            ></span>

            <span
              aria-hidden="true"
              className="absolute bottom-6 right-6 h-10 w-10 rounded-br-xl border-b-[3px] border-r-[3px] border-secondary md:bottom-8 md:right-8 xl:bottom-10 xl:right-10 xl:h-12 xl:w-12"
            ></span>

            <img src="/images/logo.png" alt="" className="w-16 xl:w-24" />
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-ink xl:text-7xl">
                MiBolsillo
              </h1>
              <p className="mt-4 max-w-[38ch] leading-relaxed text-ink/70 xl:text-lg">
                Anotá lo que gastás y enterate en qué se te va la plata.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center px-8 py-14 md:px-12 md:py-20 xl:px-16 xl:py-28 2xl:px-20">
            <h2 className="text-3xl font-bold text-ink [text-shadow:0_2px_6px_rgba(43,16,32,0.28)] xl:text-4xl">
              Iniciá sesión
            </h2>

            <form className="mt-7 flex flex-col gap-5" onSubmit={handleSubmit(submitForm)}>
              {loginError && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                  {loginError.message}
                </p>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-sm font-normal text-ink/70">
                  Usuario
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-ink/15 px-4 py-3 transition-colors focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                  <i className="bi bi-person text-ink/40"></i>
                  <input
                    id="username"
                    type="text"
                    placeholder="tu usuario"
                    className="w-full bg-transparent text-sm font-normal text-ink outline-none placeholder:text-ink/60"
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <span className="text-sm text-red-600">{errors.username.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-normal text-ink/70">
                  Contraseña
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-ink/15 px-4 py-3 transition-colors focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/20">
                  <i className="bi bi-lock text-ink/40"></i>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="tu contraseña"
                    className="w-full bg-transparent text-sm font-normal text-ink outline-none placeholder:text-ink/60"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="text-ink/40 cursor-pointer transition-colors hover:text-secondary"
                  >
                    <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                  </button>
                </div>
                {errors.password && (
                  <span className="text-sm text-red-600">{errors.password.message}</span>
                )}
              </div>

              <a
                href="#"
                className="self-end text-sm text-ink/60 underline-offset-4 transition-colors hover:text-secondary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>

              <button
                type="submit"
                disabled={isLoginPending}
                className="mt-1 cursor-pointer rounded-xl bg-quaternary py-3.5 font-semibold text-ink transition-colors hover:bg-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoginPending ? "Ingresando..." : "Ingresar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
