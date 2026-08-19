import { useEffect } from 'react';
import { Focus, LayoutGrid } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { KanbanBoard } from './components/KanbanBoard';
import { PomodoroTimer } from './components/PomodoroTimer';
import { AmbientPlayer } from './components/AmbientPlayer';
import { AICoach } from './components/AICoach';
import type { Task, PomodoroStats, AmbientSound } from './types';

const DEFAULT_TASKS: Task[] = [
  {
    id: 'demo-1',
    title: 'FocusFlow projesini keşfet',
    description: 'Kanban, Pomodoro ve AI koçu özelliklerini dene',
    priority: 'high',
    column: 'todo',
    createdAt: Date.now(),
  },
  {
    id: 'demo-2',
    title: 'İlk Pomodoro seansını başlat',
    priority: 'medium',
    column: 'todo',
    createdAt: Date.now(),
  },
];

const DEFAULT_POMO: PomodoroStats = {
  completedSessions: 0,
  totalFocusMinutes: 0,
  lastSessionDate: new Date().toISOString().slice(0, 10),
  todaySessions: 0,
};

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('focusflow-tasks', DEFAULT_TASKS);
  const [pomodoroStats, setPomodoroStats] = useLocalStorage<PomodoroStats>(
    'focusflow-pomodoro',
    DEFAULT_POMO
  );
  const [ambientSound, setAmbientSound] = useLocalStorage<AmbientSound>(
    'focusflow-ambient',
    'none'
  );

  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 glass border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Focus size={18} className="text-cyan-400" />
            </div>
            <div>
              <h1 className="text-base font-bold neon-text leading-tight">FocusFlow</h1>
              <p className="text-[10px] text-slate-500 -mt-0.5">AI Destekli Odaklanma Asistanı</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
            <LayoutGrid size={12} />
            <span>Kanban • Pomodoro • AI Koç</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-8 order-2 lg:order-1">
            <KanbanBoard tasks={tasks} onTasksChange={setTasks} />
          </section>

          <aside className="lg:col-span-4 space-y-4 order-1 lg:order-2">
            <PomodoroTimer stats={pomodoroStats} onStatsChange={setPomodoroStats} />
            <AmbientPlayer sound={ambientSound} onSoundChange={setAmbientSound} />
            <AICoach tasks={tasks} pomodoroStats={pomodoroStats} />
          </aside>
        </div>
      </main>

      <footer className="py-4 text-center text-[11px] text-slate-600">
        FocusFlow • Veriler tarayıcında localStorage ile saklanır • Hazır Supabase/Firebase entegrasyonu için
      </footer>
    </div>
  );
}

export default App;
