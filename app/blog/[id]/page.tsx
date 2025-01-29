import { ChapterContent } from '@/components/chapter-content';
import { ChapterNavigation } from '@/components/blog-navigation';
import { CommentSection } from '@/components/comment-section';
import { notFound } from 'next/navigation';
import ScrollProgress from '@/components/ui/scroll-progress';

const api = process.env.NEXT_PUBLIC_API_URL;

async function fetchChapterData(slug: string) {
  const res = await fetch(`${api}/blog/slug/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  if (!data.success) {
    return null;
  }

  return data;
}

const fetchMetaData = async (slug: string) => {
  const res = await fetch(`${api}/blog/metadata/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  if (!data.success) {
    return null;
  }

  return data;
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const chapterResponse = await fetchMetaData(params.id);
  if (!chapterResponse) {
    return {
      title: 'Chapter Not Found - Sujal Unfolded',
      description: 'This chapter is not available.',
      openGraph: {
        title: 'Chapter Not Found - Sujal Unfolded',
        description: 'This chapter is not available.',
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title: 'Chapter Not Found - Sujal Unfolded',
        description: 'This chapter is not available.',
      },
    };
  }
  const { data } = chapterResponse;
  return {
    title: `${data.title} - Sujal Unfolded`,
    description: data.excerpt,
    tags: data.tags,
    openGraph: {
      title: data.title,
      description: data.excerpt,
      url: `blog/${data.slug}`,
      images: [
        {
          url: data.thumbnail,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.excerpt,
      image: data.thumbnail,
    },
  };
}

export default async function ChapterPage({ params }: { params: { id: string } }) {
  const chapterResponse = await fetchChapterData(params.id);

  if (!chapterResponse) {
    notFound();
  }

  const { data, nextSlug, previousSlug } = chapterResponse;

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress className="top-[56px]" />
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
         
          <ChapterContent
            title={data.title}
            author={data.author.name}
            publishedAt={data.createdAt}
            views={data.views}
            content={data.content}
            thumbnail={data.thumbnail}
            aiDiscussionAudio={data.aiDiscussionAudio}
          />
          <ChapterNavigation prevSlug={previousSlug} nextSlug={nextSlug} />
          <CommentSection chapterId={data._id} />
        </article>
      </main>
    </div>
  );
}
