import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

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
function BlogCard({ title, slug, excerpt, author, views, thumbnail, createdAt }: BlogPost) {
    const date = new Date(createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  
    return (
      <Card className="mb-6 overflow-hidden hover:shadow-lg transition-shadow">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="aspect-video md:aspect-none md:h-full">
            <Image
              src={thumbnail}
              alt={title}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-2 p-6">
            <CardHeader className="p-0">
              <Link href={`/blog/${slug}`} className="hover:text-white">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
              </Link>
            </CardHeader>
            <CardContent className="p-0 my-4">
              <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
            </CardContent>
            <CardFooter className="p-0 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium">{author.name}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{date}</span>
              </div>
              <div className="text-muted-foreground text-sm">{views} views</div>
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  }

  export default BlogCard;