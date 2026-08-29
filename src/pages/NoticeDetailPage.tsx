import React, { useEffect } from 'react';
import { Post, AppRoute, SiteSettings } from '../types';
import { CmsRepository } from '../services/cmsRepository';
import {
  Pin,
  Calendar,
  User,
  Eye,
  ArrowLeft,
  Share2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface NoticeDetailPageProps {
  postId: string;
  posts: Post[];
  settings: SiteSettings;
  onNavigate: (route: AppRoute) => void;
}

export const NoticeDetailPage: React.FC<NoticeDetailPageProps> = ({
  postId,
  posts,
  settings,
  onNavigate,
}) => {
  const post = posts.find((p) => p.id === postId);

  // Increment view count once on mount
  useEffect(() => {
    if (postId) {
      CmsRepository.incrementViewCount(postId);
    }
  }, [postId]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800">게시글을 찾을 수 없습니다.</h2>
        <p className="text-sm text-slate-500 mt-2">삭제되었거나 비공개 처리된 게시글입니다.</p>
        <button
          onClick={() => onNavigate('/notice')}
          className="mt-6 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  // Find Prev / Next posts
  const published = posts.filter((p) => p.isPublished);
  const currentIndex = published.findIndex((p) => p.id === postId);
  const prevPost = currentIndex > 0 ? published[currentIndex - 1] : null;
  const nextPost = currentIndex < published.length - 1 ? published[currentIndex + 1] : null;

  return (
    <div id="notice-detail-page" className="w-full bg-white py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top back navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <button
            onClick={() => onNavigate('/notice')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>공지사항 목록</span>
          </button>
          <span className="text-xs text-slate-400">범진건축사사무소 안내</span>
        </div>

        {/* Post Article Header */}
        <article className="mt-8">
          <header className="pb-8 border-b border-slate-200 space-y-4">
            <div className="flex items-center space-x-2">
              {post.isImportant && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-md">
                  <Pin className="w-3.5 h-3.5" />
                  <span>중요공지</span>
                </span>
              )}
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                건축 실무 정보
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center text-xs text-slate-500 gap-x-6 gap-y-2 pt-2">
              <div className="flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-700">{post.author}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{post.createdAt.slice(0, 10)}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>조회수 {post.viewCount}회</span>
              </div>
            </div>
          </header>

          {/* Post Content Body */}
          <div className="py-10 text-slate-800 text-base leading-relaxed whitespace-pre-line space-y-4 font-normal">
            {post.content}
          </div>

          {/* Article Footer CTA */}
          <div className="mt-12 p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-blue-700 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>전문 건축사 1차 무료 검토</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                위 내용과 유사한 위반건축물 문제를 겪고 계신가요?
              </h4>
              <p className="text-xs text-slate-500">
                네이버폼을 통해 건축물 주소지를 남겨주시면 합법화 가능성을 빠르게 진단해 드립니다.
              </p>
            </div>
            <a
              href={settings.naverFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-3.5 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 rounded-lg shadow-sm flex items-center space-x-1.5 transition-all"
            >
              <span>무료 검토 신청하기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Prev / Next Post Navigation */}
          <div className="mt-10 border-t border-b border-slate-200 divide-y divide-slate-100 text-xs">
            {prevPost ? (
              <div
                onClick={() => {
                  onNavigate(`/notice/${prevPost.id}` as AppRoute);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-3.5 px-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-2 text-slate-500">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="font-bold text-slate-700">이전글</span>
                  <span className="text-slate-900 line-clamp-1">{prevPost.title}</span>
                </div>
                <span className="text-slate-400">{prevPost.createdAt.slice(0, 10)}</span>
              </div>
            ) : null}

            {nextPost ? (
              <div
                onClick={() => {
                  onNavigate(`/notice/${nextPost.id}` as AppRoute);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-3.5 px-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-2 text-slate-500">
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-bold text-slate-700">다음글</span>
                  <span className="text-slate-900 line-clamp-1">{nextPost.title}</span>
                </div>
                <span className="text-slate-400">{nextPost.createdAt.slice(0, 10)}</span>
              </div>
            ) : null}
          </div>

          {/* Bottom Back Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('/notice')}
              className="px-6 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
            >
              목록으로 돌아가기
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
