export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const api= process.env.NEXT_PUBLIC_API_URL;
    const fetchStories = async()=>{
        const res = await fetch(`${api}/blog/sitemap`, {
            cache: 'no-store',
        });
        const posts = await res.json();
        if(!posts.success){
            throw new Error('Failed to fetch stories');
        }
        return posts.data;
    }
    const stories = await fetchStories();
    const storyUrls = stories.map((story: any) => {
        return {
            url: `${baseUrl}/blog/${story.slug}`,
            lastModified: new Date(story.updatedAt).toISOString(),
        }
    });
    return [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
        },
        ...storyUrls,
    ];
}