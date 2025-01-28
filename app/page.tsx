import { BlogList } from '@/components/blog-list';
import { BookHeader } from '@/components/blog-header';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <BookHeader />
        <BlogList page={1} />
      </main>
    </div>

  );
}