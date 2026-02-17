import { api } from './api'

export type UserRole = 'Admin' | 'Enseignant' | 'Parent'

export interface User {
  idUtilisateur: string
  nom: string
  postnom: string
  email: string
  role: UserRole
  dernierLogin?: string
  enseignant?: { idEnseignant: string; telephone: string; specialite: string }
}

export interface LoginResponse {
  token: string
  user: User
}

export const authApi = {
  login(email: string, motDePasse: string) {
    return api.post<LoginResponse>('/auth/login', { email, motDePasse }, { skipAuth: true })
  },

  register(data: { nom: string; postnom: string; email: string; motDePasse: string }) {
    return api.post<User>('/auth/register', data, { skipAuth: true })
  },

  me() {
    return api.get<User>('/auth/me')
  },
}
