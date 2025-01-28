import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BlogCard from './blogcard';

interface Author {
  _id: string;
  name: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: Author;
  views: number;
  thumbnail: string;
  createdAt: string;
}

async function getBlogPosts(page: number) {
  const api = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${api}/blog/home/${page}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }

    const data = await response.json();
    return data.blogPosts;
  } catch (error) {
    throw new Error('Failed to fetch blog posts');
  }
}

export async function BlogList(page: { page: number }) {
  const currentPage = page.page || 1;

  try {
    const posts = await getBlogPosts(page.page);
    const POSTS_PER_PAGE = 5;

    return (
      <div className="p-8 bg-background min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 uppercase">Latest Blog Posts</h1>
          
          <div className="space-y-6">
            {posts.length === 0 && (
              <div className="text-muted-foreground">No blog posts found.</div>
            )}
            {posts.map((post: BlogPost) => (
              <BlogCard key={post._id} {...post} />
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-4">
            {currentPage > 1 && (
            <Link href={`/${Math.max(1, Number(currentPage) - 1)}`}>
            
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
            </Link>
            )}
            {posts.length < POSTS_PER_PAGE ? null : (

            <Link href={`/${Number(currentPage) + 1}`}>
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8 min-h-screen flex items-center justify-center">
        <div className="text-red-500">Failed to load blog posts. Please try again later.</div>
      </div>
    );
  }
}

export default BlogList;