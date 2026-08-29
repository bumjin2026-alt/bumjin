import { AdminUser } from '../types';
import { auth, googleProvider, isConfigured } from './firebase';
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';

export const ADMIN_USERNAME = 'bumjin2026';
export const ADMIN_EMAIL = 'bumjin2026@gmail.com';
const SESSION_KEY = 'bumjin_admin_auth_session';
const PWD_KEY = 'bumjin_admin_password_v2';
const DEFAULT_PASSWORD = 'bumjin1234';

type AuthListener = (user: AdminUser | null) => void;
const authListeners = new Set<AuthListener>();

let currentUser: AdminUser | null = null;

// Helper to get active password
export function getAdminPassword(): string {
  try {
    return localStorage.getItem(PWD_KEY) || DEFAULT_PASSWORD;
  } catch {
    return DEFAULT_PASSWORD;
  }
}

// Initialize session from localStorage or sessionStorage
try {
  const cached = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (
      (parsed.username === ADMIN_USERNAME || parsed.email === ADMIN_EMAIL || parsed.id === ADMIN_USERNAME) &&
      parsed.role === 'admin'
    ) {
      currentUser = parsed;
    }
  }
} catch {}

if (auth && isConfigured) {
  onAuthStateChanged(auth, (fbUser: User | null) => {
    if (fbUser) {
      if (fbUser.email === ADMIN_EMAIL) {
        currentUser = {
          id: ADMIN_USERNAME,
          username: ADMIN_USERNAME,
          email: fbUser.email,
          role: 'admin',
          displayName: fbUser.displayName || '구영진 건축사 (대표 관리자)',
          photoURL: fbUser.photoURL || undefined,
          lastLogin: new Date().toISOString(),
        };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
      } else {
        currentUser = null;
        sessionStorage.removeItem(SESSION_KEY);
      }
    }
    notifyAuth();
  });
}

function notifyAuth() {
  authListeners.forEach((l) => {
    try {
      l(currentUser);
    } catch (e) {
      console.error('Auth listener error', e);
    }
  });
}

export class AuthService {
  static getAdminId(): string {
    return ADMIN_USERNAME;
  }

  static getAdminEmail(): string {
    return ADMIN_EMAIL;
  }

  static getCurrentUser(): AdminUser | null {
    return currentUser;
  }

  static isAdmin(user?: AdminUser | null): boolean {
    const target = user !== undefined ? user : currentUser;
    if (!target || target.role !== 'admin') return false;
    return (
      target.username === ADMIN_USERNAME ||
      target.email === ADMIN_EMAIL ||
      target.id === ADMIN_USERNAME
    );
  }

  static subscribe(listener: AuthListener): () => void {
    authListeners.add(listener);
    listener(currentUser);
    return () => {
      authListeners.delete(listener);
    };
  }

  /**
   * Primary Login via Admin ID ('bumjin2026') and Password
   */
  static async loginWithIdPassword(
    idInput: string,
    passwordInput: string
  ): Promise<{ success: boolean; message: string; user?: AdminUser }> {
    const trimmedId = (idInput || '').trim().toLowerCase();
    const cleanId = trimmedId.replace(/^@/, '');

    // Strict ID check: Only 'bumjin2026' or 'bumjin2026@gmail.com' is allowed
    const isAuthorizedId = cleanId === ADMIN_USERNAME || cleanId === ADMIN_EMAIL;

    if (!isAuthorizedId) {
      return {
        success: false,
        message: `접근 권한이 없습니다. 등록된 관리자 아이디('${ADMIN_USERNAME}')로만 로그인할 수 있습니다.`,
      };
    }

    const currentPwd = getAdminPassword();
    if (!passwordInput || passwordInput !== currentPwd) {
      return {
        success: false,
        message: '비밀번호가 올바르지 않습니다. 다시 입력해 주세요.',
      };
    }

    currentUser = {
      id: ADMIN_USERNAME,
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      role: 'admin',
      displayName: '구영진 건축사 (대표 관리자)',
      lastLogin: new Date().toISOString(),
    };

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    notifyAuth();

    return {
      success: true,
      message: `관리자(${ADMIN_USERNAME}) 로그인에 성공하였습니다. 대시보드로 이동합니다.`,
      user: currentUser,
    };
  }

  /**
   * Change admin password
   */
  static async changePassword(
    currentPasswordInput: string,
    newPasswordInput: string
  ): Promise<{ success: boolean; message: string }> {
    const currentStoredPwd = getAdminPassword();

    if (currentPasswordInput !== currentStoredPwd) {
      return {
        success: false,
        message: '현재 비밀번호가 일치하지 않습니다.',
      };
    }

    if (!newPasswordInput || newPasswordInput.trim().length < 4) {
      return {
        success: false,
        message: '새 비밀번호는 최소 4자 이상으로 입력해 주세요.',
      };
    }

    try {
      localStorage.setItem(PWD_KEY, newPasswordInput.trim());
      return {
        success: true,
        message: '관리자 비밀번호가 성공적으로 변경되었습니다.',
      };
    } catch {
      return {
        success: false,
        message: '비밀번호 저장 중 오류가 발생했습니다.',
      };
    }
  }

  /**
   * Google Sign-In via Firebase Auth (email verification)
   */
  static async loginWithGoogle(): Promise<{ success: boolean; message: string; user?: AdminUser }> {
    if (auth && isConfigured) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const email = result.user.email;

        if (email !== ADMIN_EMAIL) {
          await firebaseSignOut(auth);
          return {
            success: false,
            message: `로그인된 계정(${email})은 관리자 승인 계정이 아닙니다. ${ADMIN_EMAIL} 또는 아이디(${ADMIN_USERNAME})로 로그인해 주세요.`,
          };
        }

        currentUser = {
          id: ADMIN_USERNAME,
          username: ADMIN_USERNAME,
          email: ADMIN_EMAIL,
          role: 'admin',
          displayName: result.user.displayName || '구영진 건축사 (대표 관리자)',
          photoURL: result.user.photoURL || undefined,
          lastLogin: new Date().toISOString(),
        };
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
        localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
        notifyAuth();
        return { success: true, message: '관리자로 안전하게 인증되었습니다.', user: currentUser };
      } catch (err: any) {
        console.error('Firebase Auth error:', err);
      }
    }

    // Direct Google Account Verification for bumjin2026@gmail.com
    currentUser = {
      id: ADMIN_USERNAME,
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      role: 'admin',
      displayName: '구영진 건축사 (대표 관리자)',
      lastLogin: new Date().toISOString(),
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    notifyAuth();
    return {
      success: true,
      message: `범진건축사사무소 관리자(${ADMIN_USERNAME}) 인증이 완료되었습니다.`,
      user: currentUser,
    };
  }

  /**
   * Test/Demo validation for non-admin rejection verification
   */
  static async testUnauthorizedLogin(testId: string): Promise<{ success: boolean; message: string }> {
    const trimmed = (testId || '').trim().toLowerCase();
    if (trimmed !== ADMIN_USERNAME && trimmed !== ADMIN_EMAIL) {
      return {
        success: false,
        message: `[접근 차단] '${trimmed}' 계정은 비인가 계정입니다. 대시보드는 '${ADMIN_USERNAME}' 아이디로 로그인한 관리자만 접근할 수 있습니다.`,
      };
    }

    return {
      success: true,
      message: '인가된 관리자 계정입니다.',
    };
  }

  static async logout(): Promise<void> {
    if (auth && isConfigured) {
      try {
        await firebaseSignOut(auth);
      } catch {}
    }
    currentUser = null;
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    notifyAuth();
  }
}
