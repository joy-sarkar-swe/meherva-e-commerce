'use client';
import { useStore } from '@/lib/store';

export default function ToastDisplay() {
  const { toast } = useStore();
  return (
    <div className={`toast${toast ? ' show' : ''}`}>
      {toast}
    </div>
  );
}
