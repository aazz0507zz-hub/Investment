import StudySidebar from '@/components/StudySidebar';

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        <StudySidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
