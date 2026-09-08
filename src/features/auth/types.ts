export interface Persona {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  telefono: string | null;
}

export type RolPersona = 'Administrador' | 'Cliente' | 'Conductor';

export interface Cuenta {
  id: number;
  email: string;
  rol: RolPersona;
  persona: Persona;
}

export interface LoginResponse {
  message: string;
  data: {
    token: string;
    token_type: string;
    cuenta: Cuenta;
  };
}

export interface MeResponse {
  data: Cuenta;
}