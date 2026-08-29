import React, { useState, useEffect } from 'react';
import { SiteSettings, Post, AdminUser, AppRoute } from './types';
import { CmsRepository } from './services/cmsRepository';
import { AuthService } from './services/authService';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CompanyPage } from './pages/CompanyPage';
import { LegalizationPage } from './pages/LegalizationPage';
import { NoticeListPage } from './pages/NoticeListPage';
import { NoticeDetailPage } from './pages/NoticeDetailPage';
import { ApplyPage } from './pages/ApplyPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export default function App() {
  // Parse route from hash (e.g. #/company) or pathname
  const getInitialRoute = (): AppRoute => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && hash.startsWith('/')) {
        return hash as AppRoute;
      }
      const path = window.location.pathname;
      if (path && path !== '/') {
        return path as AppRoute;
      }
    }
    return '/';
  };

  const [currentRoute, setCurrentRoute] = useState<AppRoute>(getInitialRoute);
  const [settings, setSettings] = useState<SiteSettings>(() => CmsRepository.getSettings());
  const [posts, setPosts] = useState<Post[]>(() => CmsRepository.getPosts());
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => AuthService.getCurrentUser());

  // Listen to popstate / hashchange for browser navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && hash.startsWith('/')) {
        setCurrentRoute(hash as AppRoute);
      } else {
        setCurrentRoute((window.location.pathname as AppRoute) || '/');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Subscribe to CMS changes and apply theme
  useEffect(() => {
    CmsRepository.applyTheme(settings);
    CmsRepository.initRemoteSync();

    const unsubscribeCMS = CmsRepository.subscribeToCMS(() => {
      const updatedSettings = CmsRepository.getSettings();
      setSettings(updatedSettings);
      setPosts(CmsRepository.getPosts());
      CmsRepository.applyTheme(updatedSettings);
    });

    const unsubscribeAuth = AuthService.subscribe((user) => {
      setAdminUser(user);
    });

    return () => {
      unsubscribeCMS();
      unsubscribeAuth();
    };
  }, []);

  // Update document title based on route
  useEffect(() => {
    const titlePrefix = settings.siteName || '범진건축사사무소';
    if (currentRoute === '/') {
      document.title = `${titlePrefix} | 위반건축물 양성화 전문 건축사사무소`;
    } else if (currentRoute === '/company') {
      document.title = `회사소개 | ${titlePrefix}`;
    } else if (currentRoute === '/legalization') {
      document.title = `위반건축물 양성화 안내 | ${titlePrefix}`;
    } else if (currentRoute.startsWith('/notice')) {
      document.title = `공지사항 | ${titlePrefix}`;
    } else if (currentRoute === '/apply') {
      document.title = `양성화검토신청서(무료) | ${titlePrefix}`;
    } else if (currentRoute === '/admin/login') {
      document.title = `관리자 로그인 | ${titlePrefix}`;
    } else if (currentRoute.startsWith('/admin')) {
      document.title = `관리자 대시보드 | ${titlePrefix}`;
    }
  }, [currentRoute, settings.siteName]);

  const handleNavigate = (route: AppRoute) => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      window.location.hash = route;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await AuthService.logout();
    setAdminUser(null);
    handleNavigate('/');
  };

  // Route Router Renderer
  const renderCurrentView = () => {
    if (currentRoute === '/admin') {
      if (!adminUser || !AuthService.isAdmin(adminUser)) {
        return (
          <AdminLoginPage
            onLoginSuccess={(user) => {
              setAdminUser(user);
              handleNavigate('/admin');
            }}
            onNavigate={handleNavigate}
          />
        );
      }
      return (
        <AdminDashboardPage
          settings={settings}
          posts={posts}
          adminUser={adminUser}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      );
    }

    if (currentRoute === '/admin/login') {
      return (
        <AdminLoginPage
          onLoginSuccess={(user) => {
            setAdminUser(user);
            handleNavigate('/admin');
          }}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentRoute === '/company') {
      return <CompanyPage settings={settings} onNavigate={handleNavigate} />;
    }

    if (currentRoute === '/legalization') {
      return <LegalizationPage settings={settings} onNavigate={handleNavigate} />;
    }

    if (currentRoute.startsWith('/notice/')) {
      const postId = currentRoute.replace('/notice/', '');
      return (
        <NoticeDetailPage
          postId={postId}
          posts={posts}
          settings={settings}
          onNavigate={handleNavigate}
        />
      );
    }

    if (currentRoute === '/notice') {
      return <NoticeListPage posts={posts} onNavigate={handleNavigate} />;
    }

    if (currentRoute === '/apply') {
      return <ApplyPage settings={settings} onNavigate={handleNavigate} />;
    }

    // Default: Home Page
    return <HomePage settings={settings} posts={posts} onNavigate={handleNavigate} />;
  };

  // When inside Admin CMS dashboard, render cleanly without outer user header/footer
  const isAdminDashboard = currentRoute === '/admin' && !!adminUser;

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-blue-900 selection:text-white">
      {!isAdminDashboard && (
        <Header
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          settings={settings}
          adminUser={adminUser}
          onLogout={handleLogout}
        />
      )}

      <main className="flex-1">{renderCurrentView()}</main>

      {!isAdminDashboard && (
        <Footer settings={settings} onNavigate={handleNavigate} />
      )}
    </div>
  );
}
