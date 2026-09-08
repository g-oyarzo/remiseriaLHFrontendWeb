import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import logoIcon from '../../../assets/LogoIcon.svg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/autos');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-surface font-body">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-surface/90 to-[#e2e2e2]/95" />
      </div>

      <main className="relative z-10 w-full max-w-md px-6">
        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_8px_16px_rgba(0,0,0,0.1)] border border-outline-variant p-8 flex flex-col items-center">
          <div className="mb-8 w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center bg-transparent">
            <img src={logoIcon} alt="Logo Remisería LH" className="w-full h-full object-contain" />
          </div>

          <div className="text-center mb-8 w-full">
            <h1 className="text-xl font-bold text-on-surface mb-2">Panel de Control</h1>
            <p className="text-sm text-on-surface-variant">Acceso exclusivo para personal autorizado</p>
          </div>

          {error && (
            <div className="w-full mb-4 bg-red-50 text-red-600 border border-red-200 rounded px-4 py-2 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm text-on-surface-variant font-semibold">
                Correo electrónico
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-lg">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@remiserialh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 text-on-surface transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm text-on-surface-variant font-semibold">
                Contraseña
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 text-lg">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2 bg-surface border border-outline-variant rounded focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 text-on-surface transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary-container transition-colors focus:outline-none"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-1 mb-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-outline-variant text-primary-container focus:ring-primary-container/50 bg-surface w-4 h-4 cursor-pointer"
                />
                <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Recordarme
                </span>
              </label>
              <a href="#" className="text-sm text-primary-container hover:text-primary transition-colors font-semibold">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary-container text-on-primary font-bold rounded hover:bg-primary focus:outline-none focus:ring-4 focus:ring-primary-container/30 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Ingresando...' : 'Iniciar sesión'}
              {!loading && <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>}
            </button>
          </form>

          <div className="mt-8 text-center w-full border-t border-outline-variant/30 pt-4">
            <p className="text-sm text-on-surface-variant/70">
              © {new Date().getFullYear()} Remisería LH. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}