import React, { useState, useMemo } from 'react';
import { Post, AppRoute } from '../types';
import { Search, Pin, Eye, Calendar, User, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface NoticeListPageProps {
  posts: Post[];
  onNavigate: (route: AppRoute) => void;
}

const ITEMS_PER_PAGE = 10;

export const NoticeListPage: React.FC<NoticeListPageProps> = ({ posts, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter only published posts for public view
  const publishedPosts = useMemo(() => {
    return posts.filter((p) => p.isPublished);
  }, [posts]);

  // Search filtered posts
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return publishedPosts;
    const term = searchTerm.toLowerCase().trim();
    return publishedPosts.filter(
      (p) => p.title.toLowerCase().includes(term) || p.content.toLowerCase().includes(term)
    );
  }, [publishedPosts, searchTerm]);

  // Sort: Important posts first, then newest
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      if (a.isImportant && !b.isImportant) return -1;
      if (!a.isImportant && b.isImportant) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filteredPosts]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(sortedPosts.length / ITEMS_PER_PAGE));
  const displayedPosts = sortedPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePostClick = (id: string) => {
    onNavigate(`/notice/${id}` as AppRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="notice-list-page" className="w-full bg-white min-h-[70vh]">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 px-4 sm:px-8 border-b border-slate-800 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800 inline-block mb-3">
            NOTICES & ARTICLES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            공지사항
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            범진건축사사무소의 최신 공지 및 위반건축물 실무 관련 가이드를 전해드립니다.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-8">
        {/* Search & Status Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="text-xs text-slate-500 font-medium">
            전체 <strong className="text-slate-900 font-bold">{filteredPosts.length}</strong>건의 게시글이 있습니다.
          </div>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="제목 또는 내용 검색"
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </div>
        </div>

        {/* Notice Table / List View */}
        {displayedPosts.length === 0 ? (
          <div className="py-20 text-center text-slate-400 space-y-3">
            <FileText className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-sm">검색 결과 또는 등록된 공지사항이 없습니다.</p>
          </div>
        ) : (
          <div className="border-t-2 border-slate-900 divide-y divide-slate-200">
            {/* Table Header (Desktop) */}
            <div className="hidden sm:grid grid-cols-12 py-3.5 bg-slate-50 text-xs font-bold text-slate-700 px-4">
              <div className="col-span-1 text-center">번호</div>
              <div className="col-span-7">제목</div>
              <div className="col-span-2 text-center">작성자</div>
              <div className="col-span-2 text-center">작성일</div>
            </div>

            {/* List Rows */}
            {displayedPosts.map((post, index) => {
              const rowNumber = sortedPosts.length - ((currentPage - 1) * ITEMS_PER_PAGE + index);

              return (
                <div
                  key={post.id}
                  id={`notice-item-${post.id}`}
                  onClick={() => handlePostClick(post.id)}
                  className={`grid grid-cols-1 sm:grid-cols-12 py-4 px-4 items-center gap-2 sm:gap-0 cursor-pointer transition-colors group ${
                    post.isImportant
                      ? 'bg-blue-50/40 hover:bg-blue-50/80 font-medium'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Col 1: Number or Pin */}
                  <div className="sm:col-span-1 flex sm:justify-center items-center">
                    {post.isImportant ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 text-[11px] font-bold text-blue-800 bg-blue-100 rounded-md">
                        <Pin className="w-3 h-3" />
                        <span>공지</span>
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">{rowNumber}</span>
                    )}
                  </div>

                  {/* Col 2: Title */}
                  <div className="sm:col-span-7 pr-2">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                  </div>

                  {/* Col 3: Author */}
                  <div className="sm:col-span-2 text-xs text-slate-500 sm:text-center flex items-center sm:justify-center space-x-1">
                    <span className="sm:hidden text-slate-400">작성자:</span>
                    <span>{post.author}</span>
                  </div>

                  {/* Col 4: Date & View Count */}
                  <div className="sm:col-span-2 text-xs text-slate-400 sm:text-center flex items-center sm:justify-center space-x-3">
                    <span>{post.createdAt.slice(0, 10)}</span>
                    <span className="flex items-center space-x-1 text-slate-400">
                      <Eye className="w-3 h-3" />
                      <span>{post.viewCount}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-12 pt-6 border-t border-slate-200">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              aria-label="이전 페이지"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              aria-label="다음 페이지"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
