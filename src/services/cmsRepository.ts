import { SiteSettings, Post, PageContent } from '../types';
import { db } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';

const SETTINGS_KEY = 'bumjin_site_settings_v1';
const POSTS_KEY = 'bumjin_posts_v1';
const PAGES_KEY = 'bumjin_pages_v1';

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: '범진건축사사무소',
  representative: '구영진 건축사',
  address: '서울시 중랑구 망우로 328, 10층 1002호(상봉동, 시네마시티)',
  phone: '02-469-0069',
  email: 'bumjin2026@gmail.com',
  naverFormUrl: 'https://naver.me/xTy3CO7K',
  mapAddress: '서울시 중랑구 망우로 328',
  heroTitle: '위반건축물, 정확한 검토와 합법적인 해결방법을 찾아드립니다.',
  heroSubtitle: '범진건축사사무소는 위반건축물 양성화 및 건축 관련 업무를 전문적으로 검토하고 고객의 상황에 맞는 해결방안을 제시합니다.',
  heroCtaText: '무료 양성화 검토신청',
  heroSecondaryCtaText: '양성화 안내 보기',
  primaryColor: '#0F1E36', // Deep Navy
  secondaryColor: '#1E293B', // Dark Charcoal
  accentColor: '#1E40AF', // Architectural Blue
  backgroundColor: '#FFFFFF',
  textColor: '#0F172A',
  fontFamily: 'Pretendard',
  borderRadius: '8px',
  buttonStyle: 'rounded',
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_POSTS: Post[] = [
  {
    id: 'post-1',
    title: '[안내] 2026년도 위반건축물 양성화 사전 검토 및 무료 상담 절차 안내',
    content: `안녕하세요, 범진건축사사무소입니다.

위반건축물(불법건축물)로 지정되어 이행강제금 부과 또는 재산권 행사에 어려움을 겪고 계신 건축주 및 소유자분들을 위해 무료 사전 검토 서비스를 제공하고 있습니다.

■ 주요 검토 대상
1. 발코니(베란다) 무단 확장 및 새시(샷시) 증축 건축물
2. 옥상 옥탑방, 계단실 증축 및 패널 가설건축물 무단 설치
3. 근린생활시설(상가)을 주거용으로 불법 용도변경한 경우 (근생빌라)
4. 다세대·다가구 주택 내 무단 가구 수 분할 (방 쪼개기)
5. 건폐율 또는 용적률 초과 의심 건축물

■ 신청 방법
홈페이지 상단 또는 본문 내 [무료 양성화 검토신청] 버튼을 클릭하신 후 네이버폼 신청서를 작성해 주시면 됩니다.
건축물대장 주소지와 현황 사진을 함께 제출해 주시면 건축사가 관계 법령과 조례를 면밀히 1차 검토하여 유선 또는 이메일로 회신드립니다.

※ 안내사항: 무료 검토는 기초적인 건축 법률 및 도면 기준을 판단하는 절차이며 실제 행정 인허가 가능 여부를 최종 보증하는 것은 아닙니다.`,
    isImportant: true,
    isPublished: true,
    viewCount: 1420,
    author: '구영진 건축사',
    createdAt: '2026-08-15T09:00:00.000Z',
    updatedAt: '2026-08-15T09:00:00.000Z',
  },
  {
    id: 'post-2',
    title: '[실무 해설] 근린생활시설 무단 주거용도 변경(근생빌라)의 양성화 가능 요건과 절차',
    content: `분양 당시 주택으로 알고 매입하였으나 건축물대장상 '제2종 근린생활시설(사무소, 고시원 등)'로 표기되어 매년 이행강제금이 부과되는 사례가 빈번합니다.

■ 근생빌라 양성화 핵심 검토 요건
1. 부설주차장 설치 기준 충족 여부
근린생활시설과 공동주택은 세대당 요구되는 법정 주차 대수가 다릅니다. 추가 주차구획 확보가 물리적으로 가능한지 여부가 가장 중요한 쟁점입니다.

2. 정화조 용량 및 소방 시설 기준
주거 용도 변경에 따른 1일 오수발생량 정화조 규격 적합성, 비상탈출구 및 소방 안전시설 충족 여부를 확인합니다.

3. 건폐율 및 용적률의 법적 여유분
해당 대지의 용도지역별 건폐율과 용적률이 허용 상한 내에 존재하는지 산출합니다.

범진건축사사무소에서는 건축물대장 현황을 면밀히 분석하여 주차장 확보 대안 및 지자체 조례별 구제 방안을 검토해 드립니다.`,
    isImportant: true,
    isPublished: true,
    viewCount: 985,
    author: '구영진 건축사',
    createdAt: '2026-08-02T14:30:00.000Z',
    updatedAt: '2026-08-02T14:30:00.000Z',
  },
  {
    id: 'post-3',
    title: '[건축 상식] 발코니 무단 증축과 옥상 패널 구조물의 법적 차이 및 개선 방안',
    content: `많은 소유자분들이 "주변 집들도 다 이렇게 시공되어 있다"며 억울함을 호소하시지만, 건축법상 인허가를 득하지 않은 증축은 명백한 행정처분 대상입니다.

■ 발코니 확장 vs 무단 증축의 구분
- 합법적인 발코니 확장: 건축법 시행령에 따라 아파트 및 공동주택의 거실·침실 등으로의 확장이 법적으로 완화되어 정식 신고 및 방화판/방화유리 설치 기준을 충족한 경우입니다.
- 불법 무단 증축: 다세대주택 베란다(일조권 사선제한으로 계단식으로 깎인 테라스 부분)에 샌드위치패널, 샷시를 설치하여 실내 면적으로 확장한 것은 건축법상 불법 증축입니다.

■ 옥상 샌드위치패널 무단 설치
옥상 공간의 누수 방지 또는 창고 용도로 판넬을 씌우는 경우에도 건축면적 및 연면적에 산입되므로 관할 구청의 허가/신고 절차를 밟아야 합니다.

위반건축물로 등재되기 전, 또는 이행강제금 사전통지서를 받으신 즉시 건축사와 상담하시어 시정명령 이행 또는 합법화 방안을 검토하시기 바랍니다.`,
    isImportant: false,
    isPublished: true,
    viewCount: 752,
    author: '구영진 건축사',
    createdAt: '2026-07-20T11:15:00.000Z',
    updatedAt: '2026-07-20T11:15:00.000Z',
  },
  {
    id: 'post-4',
    title: '[업무 가이드] 건축물대장상 \'위반건축물\' 표기 해제 절차와 행정협의 요령',
    content: `건축물대장 표제부에 노란색 바탕의 [위반건축물] 마크가 찍히면 은행 대출 제한, 전세자금대출 불가, 소유권 이전 및 매매 시 심각한 감가 요인이 발생합니다.

■ 위반건축물 표기 해제 4단계
1. 현황 측량 및 위반 도면 작성: 건축사를 통해 실제 위반된 부위의 치수와 면적을 실측합니다.
2. 합법화(설계변경/추인) 또는 원상복구 방안 수립: 법정 기준에 부합하면 추인 허가를 신청하고, 기준 미달 시 최소한의 시정 공사를 계획합니다.
3. 지자체 건축과 현장 실사 및 감리: 시정 확인서 및 관련 건축 서류를 관할 구청에 제출합니다.
4. 건축물대장 정리 및 해제: 구청 주택과/건축과의 현장 확인 후 건축물대장에서 위반 표기가 공식 삭제됩니다.

범진건축사사무소는 실측 도면 작성부터 관할 관청 건축 인허가 행정협의까지 원스톱으로 지원합니다.`,
    isImportant: false,
    isPublished: true,
    viewCount: 630,
    author: '구영진 건축사',
    createdAt: '2026-07-05T16:00:00.000Z',
    updatedAt: '2026-07-05T16:00:00.000Z',
  },
];

export const DEFAULT_PAGES: Record<string, PageContent> = {
  home: {
    pageId: 'home',
    title: '위반건축물, 정확한 검토와 합법적인 해결방법을 찾아드립니다.',
    subtitle: '범진건축사사무소는 위반건축물 양성화 및 건축 관련 업무를 전문적으로 검토하고 고객의 상황에 맞는 해결방안을 제시합니다.',
    sections: {
      work1Title: '위반건축물 양성화',
      work1Desc: '위반건축물 현황 검토, 관련 법령 및 기준 검토, 양성화 가능 여부 검토, 필요한 행정절차 안내',
      work2Title: '건축물 관련 업무',
      work2Desc: '건축물 현황 검토, 건축 관련 인허가 업무, 건축물 관련 상담',
      work3Title: '건축물 문제 해결',
      work3Desc: '건축물의 위반사항 검토, 개선방안 검토, 관계기관 협의에 필요한 건축 관련 업무',
      step1Title: '무료 검토신청',
      step1Desc: '네이버폼을 통해 간편하게 건축물 기본 정보 및 현황 사진 접수',
      step2Title: '건축물 현황 및 위반사항 검토',
      step2Desc: '건축물대장, 현장 현황, 위반 사유에 대한 건축사의 법적 기준 면밀 분석',
      step3Title: '양성화 가능성 및 해결방안 검토',
      step3Desc: '건축법령, 지자체 조례, 소방·주차장·일조권 종합 검토 후 대안 제시',
      step4Title: '필요한 건축 관련 업무 진행',
      step4Desc: '실측 및 인허가 도면 작성, 관계 행정기관 협의를 통한 합법화 추진',
    },
    updatedAt: new Date().toISOString(),
  },
  company: {
    pageId: 'company',
    title: '회사소개',
    subtitle: '신뢰와 전문성을 바탕으로 건축물의 합법적 가치를 지켜드립니다.',
    sections: {
      introP1: '범진건축사사무소는 건축물에 관한 전문적인 검토와 건축 관련 업무를 수행하는 건축사사무소입니다.',
      introP2: '특히 위반건축물과 관련하여 건축물의 현황과 위반내용을 검토하고 관련 법령 및 건축기준 등을 확인하여 고객에게 합리적인 해결방안을 안내하는 것을 목표로 합니다.',
      introP3: '건축물의 소유권 및 재산권 행사에서 발생하는 법률적·기술적 장애 요소를 정확한 시각으로 진단하고, 의뢰인의 입장에서 가장 현실적이고 안정적인 행정 솔루션을 제공합니다.',
      architectName: '구영진 건축사',
      architectRole: '대표 건축사',
      philosophy: '위반건축물은 단지 벌금만의 문제가 아닙니다. 안전과 재산권, 그리고 법률적 신뢰의 문제입니다. 범진건축사사무소는 현장 중심의 철저한 조사와 명확한 법령 해석으로 고객의 권익을 온전히 보호하겠습니다.',
    },
    updatedAt: new Date().toISOString(),
  },
  legalization: {
    pageId: 'legalization',
    title: '위반건축물 양성화 안내',
    subtitle: '정확한 법령 분석과 단계별 절차 안내로 합법적인 해결의 길을 안내합니다.',
    sections: {
      disclaimer: '모든 위반건축물이 양성화되는 것은 아닙니다.',
      disclaimerDetail: '건축물의 용도, 규모, 구조, 위치, 위반내용 및 관련 법령 등을 종합적으로 검토해야 합니다. 특정건축물 정리에 관한 특별조치법 등 관련 제도 역시 법률의 구체적 시행 여부와 지자체 기준에 따라 적용 대상이 결정되므로, 사전에 건축 전문가의 정밀 검토가 필수적입니다.',
      sec1Content: '건축법 등 관계 법령에 적합하지 않게 건축되거나 허가/신고 없이 증축, 대수선, 무단 용도변경 등이 이루어진 건축물을 의미합니다. 주요 유형으로는 불법 베란다 증축, 옥탑 증축, 근린생활시설의 주택 무단 전용(근생빌라), 다가구 쪼개기 등이 있습니다.',
      sec2Content: '특정건축물 정리에 관한 특별조치법 등 관련 제도에 따라 적용 대상이 되는 건축물에 대한 정리 가능성을 검토하고, 건축 기준 및 안전 요건을 충족하여 합법적인 사용승인(준공)을 득할 수 있도록 정리하는 일련의 건축 행정 절차를 의미합니다.',
    },
    updatedAt: new Date().toISOString(),
  },
  apply: {
    pageId: 'apply',
    title: '양성화검토신청서(무료)',
    subtitle: '전문 건축사가 의뢰인의 건축물 현황을 신속하고 정확하게 1차 검토해 드립니다.',
    sections: {
      notice1: '아래 버튼을 클릭하시면 네이버폼을 통해 무료 양성화 검토를 신청하실 수 있습니다.',
      notice2: '※ 무료 검토는 제출해 주신 자료를 바탕으로 기본적인 검토를 진행하는 절차이며, 실제 인허가 가능 여부를 보장하는 것은 아닙니다.',
      stepInfo: '1. 신청서 작성 → 2. 건축물대장 및 현황 검토 → 3. 검토 결과 안내(유선/문자) → 4. 필요 시 방문 상담 및 실무 진행',
    },
    updatedAt: new Date().toISOString(),
  },
};

// Listeners for reactive updates across the app
type Listener = () => void;
const listeners = new Set<Listener>();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error('Error notifying listener:', e);
    }
  });
}

export function subscribeToCMS(callback: Listener): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export class CmsRepository {
  static subscribeToCMS = subscribeToCMS;
  static subscribe = subscribeToCMS;

  // Apply CSS variables dynamically to document
  static applyTheme(settings: SiteSettings) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.setProperty('--color-primary', settings.primaryColor);
    root.style.setProperty('--color-secondary', settings.secondaryColor);
    root.style.setProperty('--color-accent', settings.accentColor);
    root.style.setProperty('--color-bg', settings.backgroundColor);
    root.style.setProperty('--color-text', settings.textColor);
    root.style.setProperty('--border-radius', settings.borderRadius);
    root.style.setProperty('--font-family', settings.fontFamily);
  }

  // Settings
  static getSettings(): SiteSettings {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch (e) {
      console.error('Failed reading settings from storage', e);
    }
    return DEFAULT_SETTINGS;
  }

  static async saveSettings(newSettings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = this.getSettings();
    const updated: SiteSettings = {
      ...current,
      ...newSettings,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      this.applyTheme(updated);

      if (db) {
        try {
          await setDoc(doc(db, 'siteSettings', 'global'), updated);
        } catch (dbErr) {
          console.warn('Firestore write siteSettings skipped/failed:', dbErr);
        }
      }
    } catch (e) {
      console.error('Error saving settings', e);
    }
    notifyListeners();
    return updated;
  }

  // Posts
  static getPosts(): Post[] {
    try {
      const stored = localStorage.getItem(POSTS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed reading posts from storage', e);
    }
    // Preload defaults
    try {
      localStorage.setItem(POSTS_KEY, JSON.stringify(DEFAULT_POSTS));
    } catch {}
    return DEFAULT_POSTS;
  }

  static getPostById(id: string): Post | undefined {
    const posts = this.getPosts();
    return posts.find((p) => p.id === id);
  }

  static async savePost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'> & { id?: string }): Promise<Post> {
    const posts = this.getPosts();
    const now = new Date().toISOString();
    let savedPost: Post;

    if (postData.id) {
      // Update
      const index = posts.findIndex((p) => p.id === postData.id);
      if (index !== -1) {
        savedPost = {
          ...posts[index],
          ...postData,
          updatedAt: now,
        };
        posts[index] = savedPost;
      } else {
        savedPost = {
          ...postData,
          id: postData.id,
          viewCount: 0,
          createdAt: now,
          updatedAt: now,
        };
        posts.unshift(savedPost);
      }
    } else {
      // Create new
      savedPost = {
        ...postData,
        id: `post-${Date.now()}`,
        viewCount: 0,
        createdAt: now,
        updatedAt: now,
      };
      posts.unshift(savedPost);
    }

    try {
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
      if (db) {
        try {
          await setDoc(doc(db, 'posts', savedPost.id), savedPost);
        } catch (dbErr) {
          console.warn('Firestore write post skipped/failed:', dbErr);
        }
      }
    } catch (e) {
      console.error('Error saving post', e);
    }

    notifyListeners();
    return savedPost;
  }

  static async deletePost(id: string): Promise<void> {
    let posts = this.getPosts();
    posts = posts.filter((p) => p.id !== id);
    try {
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
      if (db) {
        try {
          await deleteDoc(doc(db, 'posts', id));
        } catch (dbErr) {
          console.warn('Firestore delete post skipped/failed:', dbErr);
        }
      }
    } catch (e) {
      console.error('Error deleting post', e);
    }
    notifyListeners();
  }

  static async incrementViewCount(id: string): Promise<void> {
    const posts = this.getPosts();
    const post = posts.find((p) => p.id === id);
    if (post) {
      post.viewCount = (post.viewCount || 0) + 1;
      try {
        localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
        if (db) {
          try {
            await updateDoc(doc(db, 'posts', id), { viewCount: post.viewCount });
          } catch {}
        }
      } catch {}
      notifyListeners();
    }
  }

  // Pages
  static getPage(pageId: string): PageContent {
    try {
      const stored = localStorage.getItem(PAGES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed[pageId]) {
          return parsed[pageId];
        }
      }
    } catch (e) {
      console.error('Failed reading page from storage', e);
    }
    return DEFAULT_PAGES[pageId] || {
      pageId: pageId as any,
      title: '',
      subtitle: '',
      sections: {},
      updatedAt: new Date().toISOString(),
    };
  }

  static async savePage(pageId: string, data: Partial<PageContent>): Promise<PageContent> {
    let allPages: Record<string, PageContent> = {};
    try {
      const stored = localStorage.getItem(PAGES_KEY);
      if (stored) {
        allPages = JSON.parse(stored);
      } else {
        allPages = { ...DEFAULT_PAGES };
      }
    } catch {
      allPages = { ...DEFAULT_PAGES };
    }

    const current = allPages[pageId] || DEFAULT_PAGES[pageId];
    const updated: PageContent = {
      ...current,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    allPages[pageId] = updated;

    try {
      localStorage.setItem(PAGES_KEY, JSON.stringify(allPages));
      if (db) {
        try {
          await setDoc(doc(db, 'pages', pageId), updated);
        } catch (dbErr) {
          console.warn('Firestore write page skipped/failed:', dbErr);
        }
      }
    } catch (e) {
      console.error('Error saving page', e);
    }
    notifyListeners();
    return updated;
  }

  // Reset to factory defaults
  static async resetDefaults(): Promise<void> {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
      localStorage.setItem(POSTS_KEY, JSON.stringify(DEFAULT_POSTS));
      localStorage.setItem(PAGES_KEY, JSON.stringify(DEFAULT_PAGES));
      this.applyTheme(DEFAULT_SETTINGS);
    } catch (e) {
      console.error('Error resetting defaults', e);
    }
    notifyListeners();
  }
}
