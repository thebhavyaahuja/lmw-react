import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

export interface User {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  userType: 'instructor' | 'learner'
  createdAt: string
}

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: 'instructor' | 'learner'
}

const USERS_FILE = join(process.cwd(), 'data', 'users.json')

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = join(process.cwd(), 'data')
  if (!existsSync(dataDir)) {
    require('fs').mkdirSync(dataDir, { recursive: true })
  }
}

function getUsers(): User[] {
  ensureDataDir()
  if (!existsSync(USERS_FILE)) {
    return []
  }
  
  try {
    const data = readFileSync(USERS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

function saveUsers(users: User[]) {
  ensureDataDir()
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
}

export function createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
  const users = getUsers()
  
  // Check if user already exists
  if (users.some(user => user.email === userData.email)) {
    throw new Error('User with this email already exists')
  }
  
  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  }
  
  users.push(newUser)
  saveUsers(users)
  
  return newUser
}

export function authenticateUser(email: string, password: string): AuthUser | null {
  const users = getUsers()
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    return null
  }
  
  // Return user without password
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userType: user.userType
  }
}

export function getUserById(id: string): AuthUser | null {
  const users = getUsers()
  const user = users.find(u => u.id === id)
  
  if (!user) {
    return null
  }
  
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userType: user.userType
  }
}
