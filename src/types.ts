export type Priority = 'low' | 'medium' | 'high';
export type ColumnId = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  column: ColumnId;
  createdAt: number;
  completedAt?: number;
}

export interface PomodoroStats {
  completedSessions: number;
  totalFocusMinutes: number;
  lastSessionDate: string; // YYYY-MM-DD
  todaySessions: number;
}

export interface AppStats {
  tasksCompletedToday: number;
  tasksCreatedToday: number;
  lastActiveDate: string;
}

export type AmbientSound = 'none' | 'lofi' | 'rain';
