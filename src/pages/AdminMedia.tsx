import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  Upload, 
  Image as ImageIcon, 
  File, 
  Trash2, 
  Copy, 
  Check, 
  Loader2,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  createdAt: any;
}

export function AdminMedia() {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [files, setFiles] = useState<MediaFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const mediaCollection = collection(db, 'media');
      const q = query(mediaCollection, orderBy('createdAt', 'desc'));
      const mediaSnapshot = await getDocs(q).catch(e => {
        console.warn('Media collection inaccessible', e);
        return { docs: [] };
      });
      const mediaList = (mediaSnapshot as any).docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      })) as MediaFile[];
      setFiles(mediaList);
    } catch (err) {
      console.error('Failed to fetch media', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        const mediaCollection = collection(db, 'media');
        await addDoc(mediaCollection, {
          name: file.name,
          url: data.url,
          createdAt: new Date()
        });
        fetchFiles();
      }
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return;
    try {
      await deleteDoc(doc(db, 'media', id));
      fetchFiles();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Generations & Assets</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Upload and manage your AI-generated content and site assets.</p>
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center hover:border-purple-500/50 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all cursor-pointer group"
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleUpload} 
          className="hidden" 
          accept="image/*,video/*"
        />
        <div className="max-w-xs mx-auto">
          <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            {uploading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Upload className="w-8 h-8" />}
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Click to upload</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">or drag and drop images or videos here</p>
          <p className="text-xs text-slate-400 mt-4">PNG, JPG, GIF or MP4 up to 10MB</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {files.map((file) => (
          <div key={file.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden group shadow-sm">
            <div className="aspect-square bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
              <img src={file.url} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button 
                  onClick={() => copyToClipboard(file.url)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
                  title="Copy URL"
                >
                  {copied === file.url ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => handleDelete(file.id)}
                  className="p-2 bg-white/10 hover:bg-red-500/50 rounded-lg text-white transition-all" 
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Image</p>
            </div>
          </div>
        ))}
      </div>

      {loading && !uploading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      )}

      {files.length === 0 && !uploading && !loading && (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <ImageIcon className="w-12 h-12 text-slate-200 dark:text-slate-800 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400">No media files uploaded yet.</p>
        </div>
      )}
    </div>
  );
}
