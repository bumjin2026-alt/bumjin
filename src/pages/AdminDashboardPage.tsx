import React, { useState } from 'react';
import { SiteSettings, Post, PageContent, AdminUser, AppRoute } from '../types';
import { CmsRepository, DEFAULT_SETTINGS } from '../services/cmsRepository';
import { AuthService } from '../services/authService';
import {
  LayoutDashboard,
  FileText,
  Palette,
  Settings as SettingsIcon,
  Sliders,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Check,
  Eye,
  EyeOff,
  Pin,
  Save,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  Layers,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Download,
  Upload,
  Copy,
  FileJson,
  Cloud,
  Database,
} from 'lucide-react';

interface AdminDashboardPageProps {
  settings: SiteSettings;
  posts: Post[];
  adminUser: AdminUser;
  onNavigate: (route: AppRoute) => void;
  onLogout: () => void;
}

type AdminTab = 'overview' | 'posts' | 'pages' | 'design' | 'settings';

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  settings,
  posts,
  adminUser,
  onNavigate,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Edit post modal state
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);

  // Deploy sync modal state
  const [showDeploySyncModal, setShowDeploySyncModal] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);

  // Password change state
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Page content form state
  const [homePage, setHomePage] = useState<PageContent>(() => CmsRepository.getPage('home'));
  const [companyPage, setCompanyPage] = useState<PageContent>(() => CmsRepository.getPage('company'));
  const [legalizationPage, setLegalizationPage] = useState<PageContent>(() => CmsRepository.getPage('legalization'));

  // Notification helper
  const triggerSaveNotification = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleCopyPostsJson = async () => {
    const json = CmsRepository.exportPostsAsJSON();
    try {
      await navigator.clipboard.writeText(json);
      setCopiedType('posts');
      setTimeout(() => setCopiedType(null), 2500);
      triggerSaveNotification('공지사항 데이터(JSON)가 클립보드에 복사되었습니다.');
    } catch {
      triggerSaveNotification('클립보드 복사에 실패했습니다.');
    }
  };

  const handleCopyAllDataJson = async () => {
    const json = CmsRepository.exportAllDataAsJSON();
    try {
      await navigator.clipboard.writeText(json);
      setCopiedType('all');
      setTimeout(() => setCopiedType(null), 2500);
      triggerSaveNotification('전체 CMS 데이터(JSON)가 클립보드에 복사되었습니다.');
    } catch {
      triggerSaveNotification('클립보드 복사에 실패했습니다.');
    }
  };

  const handleDownloadPostsJson = () => {
    const json = CmsRepository.exportPostsAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bumjin_posts_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerSaveNotification('공지사항 JSON 파일이 다운로드되었습니다.');
  };

  const handleImportJson = async () => {
    if (!importJsonText.trim()) return;
    const res = await CmsRepository.importPostsFromJSON(importJsonText);
    if (res.success) {
      setImportStatus({ type: 'success', text: res.message });
      setImportJsonText('');
      triggerSaveNotification('공지사항이 성공적으로 반영되었습니다.');
    } else {
      setImportStatus({ type: 'error', text: res.message });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);
    if (newPwd !== confirmPwd) {
      setPwdMsg({ type: 'error', text: '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
      return;
    }
    const res = await AuthService.changePassword(currentPwd, newPwd);
    if (res.success) {
      setPwdMsg({ type: 'success', text: res.message });
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
    } else {
      setPwdMsg({ type: 'error', text: res.message });
    }
  };

  // Handlers for Posts
  const handleOpenNewPost = () => {
    setEditingPost({
      title: '',
      content: '',
      author: settings.representative || '구영진 건축사',
      isImportant: false,
      isPublished: true,
    });
    setIsNewPost(true);
  };

  const handleOpenEditPost = (post: Post) => {
    setEditingPost({ ...post });
    setIsNewPost(false);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editingPost.title || !editingPost.content) return;

    await CmsRepository.savePost({
      id: editingPost.id,
      title: editingPost.title,
      content: editingPost.content,
      author: editingPost.author || '구영진 건축사',
      isImportant: !!editingPost.isImportant,
      isPublished: editingPost.isPublished !== undefined ? editingPost.isPublished : true,
    });

    setEditingPost(null);
    triggerSaveNotification(isNewPost ? '새 공지사항이 등록되었습니다.' : '공지사항이 수정되었습니다.');
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('정말 이 공지사항을 삭제하시겠습니까?')) {
      await CmsRepository.deletePost(id);
      triggerSaveNotification('공지사항이 삭제되었습니다.');
    }
  };

  const handleTogglePostPublish = async (post: Post) => {
    await CmsRepository.savePost({
      ...post,
      isPublished: !post.isPublished,
    });
    triggerSaveNotification(post.isPublished ? '게시글이 비공개로 전환되었습니다.' : '게시글이 공개되었습니다.');
  };

  // Handler for Design / Theme save
  const handleSaveDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    await CmsRepository.saveSettings({
      primaryColor: settingsForm.primaryColor,
      secondaryColor: settingsForm.secondaryColor,
      accentColor: settingsForm.accentColor,
      backgroundColor: settingsForm.backgroundColor,
      textColor: settingsForm.textColor,
      fontFamily: settingsForm.fontFamily,
      borderRadius: settingsForm.borderRadius,
      buttonStyle: settingsForm.buttonStyle,
    });
    triggerSaveNotification('디자인 테마 설정이 성공적으로 저장되었습니다.');
  };

  // Handler for Site Info & Link save
  const handleSaveSiteInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    await CmsRepository.saveSettings(settingsForm);
    triggerSaveNotification('사이트 기본 정보 및 링크가 저장되었습니다.');
  };

  // Handler for Pages Content save
  const handleSavePagesContent = async (e: React.FormEvent) => {
    e.preventDefault();
    await CmsRepository.savePage('home', homePage);
    await CmsRepository.savePage('company', companyPage);
    await CmsRepository.savePage('legalization', legalizationPage);
    // Also sync hero copy to settings
    await CmsRepository.saveSettings({
      heroTitle: settingsForm.heroTitle,
      heroSubtitle: settingsForm.heroSubtitle,
      heroCtaText: settingsForm.heroCtaText,
      heroSecondaryCtaText: settingsForm.heroSecondaryCtaText,
    });
    triggerSaveNotification('페이지 콘텐츠가 업데이트되었습니다.');
  };

  // Handler for Reset to Factory Defaults
  const handleResetDefaults = async () => {
    if (window.confirm('사이트 설정과 콘텐츠를 초기 기본값으로 복원하시겠습니까?')) {
      await CmsRepository.resetDefaults();
      setSettingsForm(DEFAULT_SETTINGS);
      triggerSaveNotification('기본값으로 복원되었습니다.');
    }
  };

  return (
    <div id="admin-dashboard-container" className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Navigation Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-sm">
            범진
          </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base tracking-tight flex items-center space-x-2">
              <span>범진건축사사무소 CMS 관리자 대시보드</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                관리자 인증됨
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              로그인 계정: <span className="text-white font-bold">bumjin2026</span> (bumjin2026@gmail.com)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-slate-800 flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <span>내 웹사이트 보기</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onLogout}
            className="text-xs font-semibold text-red-300 hover:text-red-100 bg-red-950/60 hover:bg-red-900 border border-red-800 px-3 py-1.5 rounded-md flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>로그아웃</span>
          </button>
        </div>
      </header>

      {/* Save Toast Notification */}
      {saveStatus && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center space-x-2 animate-in slide-in-from-bottom-2 text-xs font-semibold">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Main Admin Body: Sidebar + Viewport */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 shrink-0 space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>대시보드 홈</span>
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'posts'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <FileText className="w-4 h-4" />
              <span>공지사항 관리</span>
            </div>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-200 text-slate-700">
              {posts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pages')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'pages'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>페이지 콘텐츠 관리</span>
          </button>

          <button
            onClick={() => setActiveTab('design')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'design'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>디자인 테마 설정</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>기본정보 & 링크 설정</span>
          </button>

          <div className="pt-6 mt-6 border-t border-slate-200 space-y-2">
            <div className="px-3 py-2 rounded-lg bg-blue-50 text-[11px] text-blue-900">
              <strong className="block font-bold">네이버폼 연동 URL</strong>
              <span className="truncate block text-[10px] text-blue-700">
                {settings.naverFormUrl}
              </span>
            </div>

            <button
              onClick={handleResetDefaults}
              className="w-full text-left px-3 py-2 rounded-lg text-[11px] text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>초기 기본값으로 복원</span>
            </button>
          </div>
        </aside>

        {/* Viewport Content */}
        <main className="flex-1 p-6 sm:p-10 max-w-6xl overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  대시보드 개요
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  범진건축사사무소 웹사이트의 주요 현황과 통계를 한눈에 확인합니다.
                </p>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-400">총 게시글 수</span>
                  <div className="text-3xl font-extrabold text-slate-900 mt-2">
                    {posts.length}
                    <span className="text-sm font-normal text-slate-500 ml-1">건</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-400">공개 중인 글</span>
                  <div className="text-3xl font-extrabold text-blue-700 mt-2">
                    {posts.filter((p) => p.isPublished).length}
                    <span className="text-sm font-normal text-slate-500 ml-1">건</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-400">중요 상단고정</span>
                  <div className="text-3xl font-extrabold text-red-600 mt-2">
                    {posts.filter((p) => p.isImportant).length}
                    <span className="text-sm font-normal text-slate-500 ml-1">건</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                  <span className="text-xs font-semibold text-slate-400">네이버폼 신청 링크</span>
                  <div className="text-sm font-bold text-emerald-600 mt-2 truncate flex items-center space-x-1">
                    <Check className="w-4 h-4" />
                    <span>정상 연결됨</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900">빠른 작업 바로가기</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('posts');
                      handleOpenNewPost();
                    }}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-2 group-hover:bg-blue-800 group-hover:text-white transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                    <strong className="block text-sm font-bold text-slate-900">새 공지사항 작성</strong>
                    <span className="text-xs text-slate-500">실무 가이드 및 공지 등록</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('design')}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center mb-2 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <Palette className="w-4 h-4" />
                    </div>
                    <strong className="block text-sm font-bold text-slate-900">디자인 테마 변경</strong>
                    <span className="text-xs text-slate-500">색상, 글꼴 및 버튼 스타일</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center mb-2 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      <SettingsIcon className="w-4 h-4" />
                    </div>
                    <strong className="block text-sm font-bold text-slate-900">기본정보 & 네이버폼 수정</strong>
                    <span className="text-xs text-slate-500">연락처 및 신청 URL 수정</span>
                  </button>
                </div>
              </div>

              {/* Recent notices list preview */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">최근 공지사항 목록</h3>
                  <button
                    onClick={() => setActiveTab('posts')}
                    className="text-xs font-bold text-blue-700 hover:underline cursor-pointer"
                  >
                    전체 관리
                  </button>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {posts.slice(0, 4).map((post) => (
                    <div key={post.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {post.isImportant && (
                          <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold">
                            중요
                          </span>
                        )}
                        <span className="font-semibold text-slate-900">{post.title}</span>
                      </div>
                      <span className="text-slate-400">{post.createdAt.slice(0, 10)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: POSTS CMS */}
          {activeTab === 'posts' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    공지사항 및 실무 가이드 관리
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    홈페이지에 게재되는 게시글을 작성, 수정, 상단고정 및 배포용 동기화를 수행합니다.
                  </p>
                </div>
                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() => setShowDeploySyncModal(true)}
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Cloud className="w-4 h-4 text-blue-600" />
                    <span>배포 동기화 & 백업</span>
                  </button>
                  <button
                    onClick={handleOpenNewPost}
                    className="px-4 py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>새 게시글 작성</span>
                  </button>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-xs font-bold text-blue-950">
                      수정된 공지사항 실시간 반영 및 배포 가이드
                    </strong>
                    <span className="text-[11px] text-blue-800">
                      대시보드에서 수정한 모든 내용은 현재 즉시 브라우저와 저장소에 저장되며, [배포 동기화 & 백업] 버튼을 통해 배포용 코드를 즉시 내보내거나 동기화할 수 있습니다.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowDeploySyncModal(true)}
                  className="shrink-0 px-3 py-1.5 text-xs font-bold bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition-colors cursor-pointer"
                >
                  배포 데이터 확인
                </button>
              </div>

              {/* Posts Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="py-3.5 px-4 w-16 text-center">상태</th>
                      <th className="py-3.5 px-4">제목</th>
                      <th className="py-3.5 px-4 w-24 text-center">작성자</th>
                      <th className="py-3.5 px-4 w-28 text-center">작성일</th>
                      <th className="py-3.5 px-4 w-20 text-center">조회수</th>
                      <th className="py-3.5 px-4 w-32 text-center">관리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 text-center">
                          {post.isImportant && (
                            <span className="inline-block px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold">
                              중요
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          <div className="flex items-center space-x-2">
                            <span>{post.title}</span>
                            {!post.isPublished && (
                              <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 text-[10px]">
                                비공개
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center text-slate-500">{post.author}</td>
                        <td className="py-3 px-4 text-center text-slate-400">
                          {post.createdAt.slice(0, 10)}
                        </td>
                        <td className="py-3 px-4 text-center text-slate-500">{post.viewCount}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center space-x-1.5">
                            <button
                              onClick={() => handleTogglePostPublish(post)}
                              title={post.isPublished ? '비공개로 전환' : '공개로 전환'}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                            >
                              {post.isPublished ? (
                                <Eye className="w-3.5 h-3.5 text-blue-600" />
                              ) : (
                                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                              )}
                            </button>
                            <button
                              onClick={() => handleOpenEditPost(post)}
                              title="수정"
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              title="삭제"
                              className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PAGES CONTENT CMS */}
          {activeTab === 'pages' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  페이지 콘텐츠 관리
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  홈 화면의 히어로 문구, 회사소개 안내문 및 양성화 안내 텍스트를 직접 수정합니다.
                </p>
              </div>

              <form onSubmit={handleSavePagesContent} className="space-y-8">
                {/* Home Hero Content Box */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
                    <span>홈 화면 (HERO 영역) 문구 설정</span>
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        메인 헤드라인 (히어로 제목)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.heroTitle}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, heroTitle: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        서브 헤드라인 (히어로 설명문)
                      </label>
                      <textarea
                        rows={3}
                        value={settingsForm.heroSubtitle}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          주요 CTA 버튼 문구
                        </label>
                        <input
                          type="text"
                          value={settingsForm.heroCtaText}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, heroCtaText: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          보조 버튼 문구
                        </label>
                        <input
                          type="text"
                          value={settingsForm.heroSecondaryCtaText}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, heroSecondaryCtaText: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Introduction Content Box */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                    회사소개 페이지 콘텐츠
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        페이지 타이틀
                      </label>
                      <input
                        type="text"
                        value={companyPage.title}
                        onChange={(e) => setCompanyPage({ ...companyPage, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        대표 인사말 본문
                      </label>
                      <textarea
                        rows={4}
                        value={companyPage.sections?.philosophy || ''}
                        onChange={(e) =>
                          setCompanyPage({
                            ...companyPage,
                            sections: { ...companyPage.sections, philosophy: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Legalization Guide Content Box */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                    양성화안내 페이지 법적 안내문
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        법률 주의 안내 문구 (노란 배너)
                      </label>
                      <textarea
                        rows={3}
                        value={legalizationPage.sections?.disclaimerDetail || ''}
                        onChange={(e) =>
                          setLegalizationPage({
                            ...legalizationPage,
                            sections: { ...legalizationPage.sections, disclaimerDetail: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-sm cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>페이지 콘텐츠 전체 저장</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: DESIGN & THEME CMS */}
          {activeTab === 'design' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  디자인 테마 설정
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  메인/서브/강조 색상, 글꼴 및 버튼 형태를 직접 수정하여 실시간으로 사이트 스타일을 제어합니다.
                </p>
              </div>

              <form onSubmit={handleSaveDesign} className="space-y-6">
                {/* Color Palette Box */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                    브랜드 색상 팔레트
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Primary */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        메인 색상 (Primary Color)
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settingsForm.primaryColor}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, primaryColor: e.target.value })
                          }
                          className="w-12 h-10 rounded-lg border border-slate-300 cursor-pointer p-1"
                        />
                        <input
                          type="text"
                          value={settingsForm.primaryColor}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, primaryColor: e.target.value })
                          }
                          className="flex-1 px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400">기본값: #0F1E36 (Deep Navy)</span>
                    </div>

                    {/* Secondary */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        서브 색상 (Secondary Color)
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settingsForm.secondaryColor}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, secondaryColor: e.target.value })
                          }
                          className="w-12 h-10 rounded-lg border border-slate-300 cursor-pointer p-1"
                        />
                        <input
                          type="text"
                          value={settingsForm.secondaryColor}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, secondaryColor: e.target.value })
                          }
                          className="flex-1 px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400">기본값: #1E293B (Dark Charcoal)</span>
                    </div>

                    {/* Accent */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        강조 색상 (Accent Color)
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={settingsForm.accentColor}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, accentColor: e.target.value })
                          }
                          className="w-12 h-10 rounded-lg border border-slate-300 cursor-pointer p-1"
                        />
                        <input
                          type="text"
                          value={settingsForm.accentColor}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, accentColor: e.target.value })
                          }
                          className="flex-1 px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400">기본값: #1E40AF (Architectural Blue)</span>
                    </div>
                  </div>
                </div>

                {/* Typography & Shapes */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                    타이포그래피 및 컴포넌트 형태
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Font Family */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        기본 글꼴 (Font Family)
                      </label>
                      <select
                        value={settingsForm.fontFamily}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, fontFamily: e.target.value })
                        }
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      >
                        <option value="Pretendard">Pretendard (권장)</option>
                        <option value="Noto Sans KR">Noto Sans KR</option>
                        <option value="Nanum Gothic">Nanum Gothic</option>
                      </select>
                    </div>

                    {/* Border Radius */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        모서리 곡률 (Border Radius)
                      </label>
                      <select
                        value={settingsForm.borderRadius}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, borderRadius: e.target.value })
                        }
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      >
                        <option value="4px">4px (모던 직각 스타일)</option>
                        <option value="8px">8px (기본 건축 스타일)</option>
                        <option value="12px">12px (부드러운 라운드)</option>
                        <option value="16px">16px (소프트 스타일)</option>
                      </select>
                    </div>

                    {/* Button Style */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        버튼 형태 스타일
                      </label>
                      <select
                        value={settingsForm.buttonStyle}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, buttonStyle: e.target.value as any })
                        }
                        className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      >
                        <option value="rounded">Rounded (스탠다드 라운드)</option>
                        <option value="solid">Solid (샤프 엣지)</option>
                        <option value="pill">Pill (캡슐 알약형)</option>
                      </select>
                    </div>
                  </div>

                  {/* Live Style Preview Chip */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-700 block">
                        현재 설정된 스타일 미리보기
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {settingsForm.fontFamily} / {settingsForm.primaryColor}
                      </span>
                    </div>
                    <button
                      type="button"
                      style={{
                        backgroundColor: settingsForm.accentColor,
                        borderRadius: settingsForm.borderRadius,
                      }}
                      className="px-4 py-2 text-white text-xs font-bold shadow-xs"
                    >
                      샘플 버튼 미리보기
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-sm cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>디자인 테마 설정 저장</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: BASIC INFO & LINKS */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  기본정보 & 링크 설정
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  사무소 명칭, 대표자, 주소, 대표전화 및 네이버폼 URL을 수정합니다.
                </p>
              </div>

              <form onSubmit={handleSaveSiteInfo} className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                    사무소 공식 정보
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        웹사이트 및 사무소명
                      </label>
                      <input
                        type="text"
                        value={settingsForm.siteName}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, siteName: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        대표자 성명
                      </label>
                      <input
                        type="text"
                        value={settingsForm.representative}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, representative: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        대표 전화번호
                      </label>
                      <input
                        type="text"
                        value={settingsForm.phone}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        관리자 및 대표 이메일
                      </label>
                      <input
                        type="email"
                        value={settingsForm.email}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, email: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        사무소 소재지 주소
                      </label>
                      <input
                        type="text"
                        value={settingsForm.address}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, address: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* External Form & Maps Link Box */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                    네이버폼 & 지도 연동 설정
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        무료 양성화 검토신청 네이버폼 URL
                      </label>
                      <input
                        type="url"
                        value={settingsForm.naverFormUrl}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, naverFormUrl: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-blue-700"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        기본 연결: https://naver.me/xTy3CO7K
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Google 지도 검색 주소 키워드
                      </label>
                      <input
                        type="text"
                        value={settingsForm.mapAddress}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, mapAddress: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-sm cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>기본정보 및 링크 저장</span>
                  </button>
                </div>
              </form>

              {/* Admin Account & Security Settings Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <h3 className="text-base font-bold text-slate-900">
                      관리자 계정 및 보안 설정
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 rounded-lg">
                    아이디: bumjin2026
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Account Details Box */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900">인가된 관리자 계정 정보</h4>
                    <div className="space-y-1.5 text-xs text-slate-600">
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">관리자 아이디</span>
                        <strong className="text-slate-900 font-mono">bumjin2026</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">관리자 이메일</span>
                        <span className="text-slate-900 font-mono">bumjin2026@gmail.com</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-200/60">
                        <span className="text-slate-500">보안 등급</span>
                        <span className="text-emerald-700 font-bold">최고 관리자 (Admin)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-slate-500">대시보드 접근</span>
                        <span className="text-blue-700 font-bold">bumjin2026 전용 접근 인가</span>
                      </div>
                    </div>
                  </div>

                  {/* Password Change Form */}
                  <form onSubmit={handleChangePassword} className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-900">관리자 비밀번호 변경</h4>

                    {pwdMsg && (
                      <div
                        className={`p-3 rounded-lg text-xs font-medium flex items-center space-x-2 ${
                          pwdMsg.type === 'success'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{pwdMsg.text}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        현재 비밀번호
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPwd}
                        onChange={(e) => setCurrentPwd(e.target.value)}
                        placeholder="현재 비밀번호를 입력하세요"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        새 비밀번호
                      </label>
                      <input
                        type="password"
                        required
                        value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)}
                        placeholder="새 비밀번호 입력 (4자 이상)"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        새 비밀번호 확인
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPwd}
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        placeholder="새 비밀번호 재입력"
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
                    >
                      비밀번호 변경 적용
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Edit / New Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {isNewPost ? '새 공지사항 등록' : '공지사항 수정'}
              </h3>
              <button
                onClick={() => setEditingPost(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                닫기
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingPost.title || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  placeholder="공지사항 제목을 입력하세요"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">작성자</label>
                  <input
                    type="text"
                    value={editingPost.author || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="flex items-center space-x-6 pt-5">
                  <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingPost.isImportant}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, isImportant: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span>중요 공지 (상단 고정)</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingPost.isPublished !== false}
                      onChange={(e) =>
                        setEditingPost({ ...editingPost, isPublished: e.target.checked })
                      }
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span>공개 여부</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  본문 내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={10}
                  value={editingPost.content || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  placeholder="공지사항 본문 내용을 입력하세요. 줄바꿈 및 서식이 그대로 반영됩니다."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:bg-white leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  {isNewPost ? '게시글 등록' : '수정사항 저장'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deploy Data Sync & Export Modal */}
      {showDeploySyncModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    배포 데이터 동기화 & 백업 관리
                  </h3>
                  <p className="text-xs text-slate-500">
                    대시보드에서 수정한 공지사항을 배포 및 영구 보관하기 위한 도구입니다.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowDeploySyncModal(false);
                  setImportStatus(null);
                }}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕ 닫기
              </button>
            </div>

            {/* Current Status Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">관리자 보관 공지사항</span>
                <strong className="text-xl font-black text-blue-900 mt-1 block">
                  {posts.length} <span className="text-xs font-normal text-slate-600">건</span>
                </strong>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center space-x-1 mt-1">
                  <Check className="w-3 h-3" />
                  <span>로컬 브라우저 저장소 실시간 동기화 완료</span>
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">공개 중인 게시글</span>
                <strong className="text-xl font-black text-slate-900 mt-1 block">
                  {posts.filter((p) => p.isPublished).length} <span className="text-xs font-normal text-slate-600">건</span>
                </strong>
                <span className="text-[10px] text-slate-500 block mt-1">
                  중요 고정: {posts.filter((p) => p.isImportant).length}건
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">원클릭 배포 동기화</span>
                <strong className="text-xs font-bold text-slate-800 mt-1 block">
                  JSON 복사 및 다운로드 지원
                </strong>
                <span className="text-[10px] text-blue-700 block mt-1">
                  소스코드 기본값에 즉시 반영 가능
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                1. 배포용 데이터 내보내기 (Export)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Copy Posts JSON */}
                <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 bg-white transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileJson className="w-4 h-4 text-blue-600" />
                      <strong className="text-xs font-bold text-slate-900">공지사항 JSON 복사</strong>
                    </div>
                    {copiedType === 'posts' && (
                      <span className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>복사 완료!</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    현재 수정된 전체 공지사항 목록 데이터를 클립보드에 복사합니다.
                  </p>
                  <button
                    onClick={handleCopyPostsJson}
                    className="w-full py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>공지사항 데이터 클립보드 복사</span>
                  </button>
                </div>

                {/* Download Posts JSON */}
                <div className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 bg-white transition-all space-y-2">
                  <div className="flex items-center space-x-2">
                    <Download className="w-4 h-4 text-emerald-600" />
                    <strong className="text-xs font-bold text-slate-900">JSON 파일 다운로드</strong>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    수정된 공지사항을 <code className="text-blue-700 bg-blue-50 px-1 rounded">bumjin_posts.json</code> 파일로 다운로드합니다.
                  </p>
                  <button
                    onClick={handleDownloadPostsJson}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>공지사항 JSON 다운로드</span>
                  </button>
                </div>
              </div>

              {/* Copy Full Backup */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <strong className="font-bold text-slate-800">전체 사이트 데이터 백업 (공지사항 + 설정 + 문구)</strong>
                  <p className="text-[11px] text-slate-500">공지사항뿐만 아니라 테마 설정 및 페이지 소개문구까지 모두 포함한 전체 백업본</p>
                </div>
                <button
                  onClick={handleCopyAllDataJson}
                  className="shrink-0 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedType === 'all' ? '전체 복사 완료!' : '전체 CMS 복사'}</span>
                </button>
              </div>
            </div>

            {/* Import / Restore Section */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                2. 공지사항 데이터 불러오기 / 복원 (Import)
              </h4>
              <p className="text-[11px] text-slate-500">
                기존에 백업해 둔 JSON 배열 텍스트를 붙여넣어 공지사항 데이터를 즉시 일괄 적용할 수 있습니다.
              </p>
              <textarea
                rows={3}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='[ { "id": "post-1", "title": "...", "content": "..." } ] 형식의 JSON 붙여넣기'
                className="w-full px-3.5 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600"
              />
              {importStatus && (
                <div
                  className={`p-3 rounded-lg text-xs font-semibold flex items-center space-x-2 ${
                    importStatus.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {importStatus.type === 'success' ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                  <span>{importStatus.text}</span>
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleImportJson}
                  disabled={!importJsonText.trim()}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center space-x-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>공지사항 데이터 불러오기 적용</span>
                </button>
              </div>
            </div>

            {/* Deployment Guide Info Box */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-2">
              <strong className="font-bold block text-amber-900 flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>웹사이트 배포(Hosting / GitHub) 반영 팁</span>
              </strong>
              <ul className="list-disc list-inside text-[11px] space-y-1 text-amber-900/90 leading-relaxed">
                <li>
                  <strong>브라우저 실시간 저장:</strong> 관리자 대시보드에서 수정한 내용은 관리자 브라우저에 실시간 즉시 반영되어 사이트 화면에서 즉시 확인하실 수 있습니다.
                </li>
                <li>
                  <strong>새 배포 빌드 시:</strong> 소스코드의 <code className="bg-amber-100 text-amber-950 px-1 py-0.5 rounded font-mono">cmsRepository.ts</code> 파일의 <code className="bg-amber-100 text-amber-950 px-1 py-0.5 rounded font-mono">DEFAULT_POSTS</code>를 위 복사한 JSON으로 업데이트하거나, 상단의 <strong>[공지사항 JSON 복사]</strong>를 이용하시면 새로 배포된 사이트에서도 영구 보존됩니다.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
