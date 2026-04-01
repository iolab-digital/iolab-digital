"use client";

import { useState } from "react";
import { X, Calendar, Flag, User, GripVertical } from "lucide-react";
import { TASKS, STAGES, TEAM, type Task } from "@/data/demos/projects-data";
import type { BrandTheme } from "@/components/demos/shared/DemoGate";

const PRIORITY_STYLES = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-100 text-blue-600",
  high: "bg-red-100 text-red-600",
};

export function ProjectDemo({ brand }: { brand?: BrandTheme | null }) {
  const [tasks, setTasks] = useState(TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const primary = brand?.primaryColor || "#7B2FF7";
  const total = tasks.length;
  const done = tasks.filter((t) => t.stage === "done").length;
  const progressPct = Math.round((done / total) * 100);

  function handleDrop(stage: string) {
    if (!draggedTask) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === draggedTask.id ? { ...t, stage: stage as Task["stage"] } : t
      )
    );
    setDraggedTask(null);
  }

  return (
    <div className="flex h-[600px] text-sm">
      {/* Left sidebar — team + progress */}
      <div className="w-52 border-r border-gray-200 bg-white p-4 flex flex-col shrink-0">
        <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">
          Client Portal Build
        </h3>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-bold" style={{ color: primary }}>{progressPct}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%`, background: primary }}
            />
          </div>
          <div className="text-[10px] text-gray-400 mt-1">
            {done} of {total} tasks complete
          </div>
        </div>

        {/* Team */}
        <h4 className="font-semibold text-xs text-gray-500 uppercase tracking-wider mb-2">
          Team
        </h4>
        <div className="space-y-2">
          {TEAM.map((member) => (
            <div key={member.name} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                style={{ background: primary }}
              >
                {member.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium truncate">{member.name}</div>
                <div className="text-[10px] text-gray-400">{member.role} &middot; {member.taskCount} tasks</div>
              </div>
            </div>
          ))}
        </div>

        {/* Stage counts */}
        <div className="mt-auto pt-4 border-t border-gray-200 space-y-1.5">
          {STAGES.map((stage) => {
            const count = tasks.filter((t) => t.stage === stage.id).length;
            return (
              <div key={stage.id} className="flex justify-between text-xs">
                <span className="text-gray-500">{stage.label}</span>
                <span className={`font-medium px-1.5 py-0.5 rounded text-[10px] ${stage.color}`}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kanban board */}
      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex gap-4 h-full min-w-max">
          {STAGES.map((stage) => {
            const stageTasks = tasks.filter((t) => t.stage === stage.id);
            return (
              <div
                key={stage.id}
                className="w-64 flex flex-col"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(stage.id)}
              >
                <div className="flex items-center gap-2 mb-3 px-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stage.color}`}>
                    {stage.label}
                  </span>
                  <span className="text-xs text-gray-400">{stageTasks.length}</span>
                </div>

                <div className="flex-1 bg-gray-50 rounded-xl p-2 space-y-2 min-h-[200px]">
                  {stageTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => setDraggedTask(task)}
                      onClick={() => setSelectedTask(task)}
                      className="rounded-lg bg-white border border-gray-200 p-3 cursor-pointer hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-start gap-1.5">
                        <GripVertical className="h-4 w-4 text-gray-300 mt-0.5 opacity-0 group-hover:opacity-100 cursor-grab shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-xs mb-1.5">{task.title}</div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${PRIORITY_STYLES[task.priority]}`}>
                              {task.priority}
                            </span>
                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                              <Calendar className="h-3 w-3" /> {task.dueDate}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 mt-2">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
                              style={{ background: primary }}
                            >
                              {task.avatar}
                            </div>
                            <span className="text-[10px] text-gray-400">{task.assignee}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Task detail modal */}
      {selectedTask && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
          onClick={() => setSelectedTask(null)}>
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base">{selectedTask.title}</h3>
              <button onClick={() => setSelectedTask(null)} className="text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600 text-sm mb-4">{selectedTask.description}</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Assignee:</span>
                <span className="font-medium">{selectedTask.assignee}</span>
              </div>
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Priority:</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${PRIORITY_STYLES[selectedTask.priority]}`}>
                  {selectedTask.priority}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Due:</span>
                <span className="font-medium">{selectedTask.dueDate}</span>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button className="flex-1 py-2 rounded-lg text-white text-xs font-medium" style={{ background: primary }}>
                Move to Next Stage
              </button>
              <button onClick={() => setSelectedTask(null)} className="px-4 py-2 rounded-lg text-xs font-medium border border-gray-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
