import { useMemo } from 'react';
import { Sparkles, TrendingUp, Coffee, Target, Zap } from 'lucide-react';
import type { Task, PomodoroStats } from '../types';

interface AICoachProps {
  tasks: Task[];
  pomodoroStats: PomodoroStats;
}

export function AICoach({ tasks, pomodoroStats }: AICoachProps) {
  const insight = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const completedToday = tasks.filter(
      (t) => t.column === 'done' && t.completedAt && new Date(t.completedAt).toISOString().slice(0, 10) === today
    ).length;
    const inProgress = tasks.filter((t) => t.column === 'in-progress').length;
    const todo = tasks.filter((t) => t.column === 'todo').length;
    const highPriorityTodo = tasks.filter((t) => t.column === 'todo' && t.priority === 'high').length;
    const sessions = pomodoroStats.todaySessions;

    if (sessions === 0 && completedToday === 0 && todo > 0) {
      return {
        icon: Zap,
        color: 'text-amber-400',
        message: 'Güne başlamak için harika bir zaman! İlk Pomodoro seansını başlat ve yüksek öncelikli görevlere odaklan.',
        tip: highPriorityTodo > 0 ? `${highPriorityTodo} yüksek öncelikli görev seni bekliyor.` : 'Küçük bir görevle başla.',
      };
    }

    if (sessions >= 4 && completedToday >= 3) {
      return {
        icon: TrendingUp,
        color: 'text-emerald-400',
        message: 'Bugün harika gidiyorsun! 🔥 Odak ve üretkenlik seviyen çok yüksek.',
        tip: 'Bu ritmi koru, ama ara sıra kısa molalar almayı unutma.',
      };
    }

    if (sessions >= 2 && completedToday === 0) {
      return {
        icon: Target,
        color: 'text-cyan-400',
        message: 'Odak seansların güzel ilerliyor ama henüz görev tamamlamadın.',
        tip: 'Şu an yaptığın işi bitirmeye odaklan, sonra bir görevi “Tamamlandı”ya taşı.',
      };
    }

    if (inProgress > 3) {
      return {
        icon: Coffee,
        color: 'text-orange-400',
        message: 'Biraz yavaşladın gibi görünüyor. Aynı anda çok fazla görev “Yapılıyor” durumunda.',
        tip: '5 dakika mola verip en önemli 1-2 göreve odaklanmayı dene.',
      };
    }

    if (completedToday >= 1 && sessions >= 1) {
      return {
        icon: Sparkles,
        color: 'text-violet-400',
        message: 'İyi bir ritimdesin! Hem görev hem odak tarafında ilerleme var.',
        tip: sessions < 3 ? 'Bir Pomodoro daha yaparsan günün hedeflerine daha yaklaşabilirsin.' : 'Devam et, harikasın!',
      };
    }

    return {
      icon: Sparkles,
      color: 'text-cyan-400',
      message: 'FocusFlow yanında. Görevlerini planla, odaklan ve ilerlemeyi hisset.',
      tip: 'Küçük adımlarla büyük ilerlemeler kaydedersin.',
    };
  }, [tasks, pomodoroStats]);

  const Icon = insight.icon;

  return (
    <div className="glass rounded-2xl p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl -mr-8 -mt-8" />
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 rounded-lg bg-cyan-500/15">
          <Sparkles size={14} className="text-cyan-400" />
        </div>
        <h3 className="text-sm font-semibold text-slate-200">AI Performans Koçu</h3>
      </div>

      <div className="flex gap-3">
        <div className={`shrink-0 mt-0.5 ${insight.color}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-sm text-slate-200 leading-relaxed">{insight.message}</p>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{insight.tip}</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-700/50 flex gap-3 text-[11px] text-slate-500">
        <span>
          Bugün: <strong className="text-slate-300">{pomodoroStats.todaySessions}</strong> pomodoro
        </span>
        <span>•</span>
        <span>
          Tamamlanan:{' '}
          <strong className="text-slate-300">
            {tasks.filter((t) => t.column === 'done').length}
          </strong>
        </span>
      </div>
    </div>
  );
}
