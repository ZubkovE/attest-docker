import Observable from './observable.ts'

export interface TokenStorage {
  write: (value: TokenStorageValue) => void
  read: () => TokenStorageValue | undefined
  remove: () => void
}

export interface TokenStorageValue {
  password: string
  login: string
}

class TokenStorageImpl extends Observable<TokenStorageValue | undefined> implements TokenStorage {
  private static instance: TokenStorageImpl = new TokenStorageImpl()
  private key = 'token'
  private token?: TokenStorageValue

  private constructor() {
    super()
  }

  read() {
    const token = localStorage.getItem(this.key)
    if (!token) return
    this.token = JSON.parse(token)
    return this.token
  }

  remove() {
    this.token = undefined
    localStorage.removeItem(this.key)
    this.notify(this.token)
  }

  write(value: TokenStorageValue) {
    localStorage.setItem(this.key, JSON.stringify(value))
    this.token = value
    this.notify(this.token)
  }

  public static getInstance(): TokenStorageImpl {
    return TokenStorageImpl.instance
  }
}

export default TokenStorageImpl.getInstance()
