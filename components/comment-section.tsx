'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
const api = process.env.NEXT_PUBLIC_API_URL;

interface Comment {
  _id: string;
  name: string;
  comment: string;
  isApproved?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export function CommentSection({ chapterId }: { chapterId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const url = `${api}/comment/${chapterId}`;

        const response = await fetch(url, {
        });
        const data: ApiResponse<Comment[]> = await response.json();

        if (data.success) {
          setComments(data.data);
        } else {
          toast({
            title: 'Error',
            description: data.message,
            variant: 'destructive',
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch comments.',
          variant: 'destructive',
        });
      }
    };

    fetchComments();
  }, [chapterId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      toast({
        title: 'Error',
        description: 'Comment cannot be empty.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch(`${api}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: newComment.trim(),
          blogPostId: chapterId,
          name: newName,
        }),
      });

      const data: ApiResponse<null> = await response.json();

      if (data.success) {
        toast({
          title: 'Comment submitted',
          description: 'Your comment has been submitted for review.',
        });
        setNewComment('');
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to submit the comment.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  const visibleComments = isExpanded ? comments : comments.slice(0, 3);

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <MessageSquare className="h-5 w-5 mr-2" />
        Comments
      </h2>

      <form onSubmit={handleSubmitComment} className="mb-8">
        <label htmlFor="name" className="text-sm font-medium block mb-2">
          Name
        </label>
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Your name"
          className="mb-4"
          id='name'
          />

        <label htmlFor="comment" className="text-sm font-medium block mb-2">
          Comment
        </label>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="mb-4"
          id='comment'
        />
        <Button className='text-white' type="submit">Submit Comment</Button>
      </form>

      <div className="space-y-6">
        {visibleComments.map((comment) => (
          <div key={comment._id} className="border-l-2 border-primary pl-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{comment.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">{comment.comment}</p>
          </div>
        ))}
      </div>

      {comments.length > 3 && (
        <div className="mt-4">
          <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Show Less' : `Show ${comments.length - 3} More`}
          </Button>
        </div>
      )}
    </div>
  );
}
