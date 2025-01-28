import { BookOpen } from 'lucide-react';
import Image from 'next/image';

export function BookHeader() {
  return (
    <div className="mb-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <Image src="https://sdrive.blr1.cdn.digitaloceanspaces.com/files/4cfb797bd42593aaf2b981960f6966d3.gif" alt="logo" height={400} width={400} className="h-32 w-32 text-primary rounded rounded-lg" />
      </div>
      <h1 className="text-4xl font-extrabold dark:text-primary text-black tracking-tight mb-2 uppercase">Sujal Unfolded</h1>
      <p className="text-muted-foreground">
      </p>
    </div>
  );
}