import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Pencil, Trash2, Check } from 'lucide-react';
import type { Task, Priority } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const priorityLabels: Record<Priority, string> = {
  low: 'Düşük',
  medium: 'Orta',
  high: 'Yüksek',
};

export function TaskCard({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`glass glass-hover rounded-xl p-3 mb-2 transition-smooth group ${
        isDragging ? 'dragging z-50' : ''
      } ${task.column === 'done' ? 'opacity-70' : ''}`}
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 p-1 rounded-md text-slate-500 hover:text-cyan-400 cursor-grab active:cursor-grabbing touch-none"
          aria-label="Sürükle"
        >
          <GripVertical size={16} />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full priority-${task.priority}`}
            >
              {priorityLabels[task.priority]}
            </span>
          </div>
          <h4
            className={`text-sm font-medium text-slate-100 leading-snug ${
              task.column === 'done' ? 'line-through text-slate-400' : ''
            }`}
          >
            {task.title}
          </h4>
          {task.description && (
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{task.description}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {task.column !== 'done' && (
            <button
              onClick={() => onToggleComplete(task.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 transition-smooth"
              title="Tamamla"
            >
              <Check size={14} />
            </button>
          )}
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-smooth"
            title="Düzenle"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-smooth"
            title="Sil"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
