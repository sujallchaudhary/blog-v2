import { BlogList } from '@/components/blog-list';
import { BookHeader } from '@/components/blog-header';

interface HomeProps {
  params: {
    page: number;
  };
}

export default function Home({ params }: HomeProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <BookHeader />
        <BlogList page={params.page} />
      </main>
    </div>

  );
}