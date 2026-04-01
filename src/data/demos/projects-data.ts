export type Task = {
  id: number;
  title: string;
  description: string;
  assignee: string;
  avatar: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  stage: "todo" | "in_progress" | "review" | "done";
  project: string;
};

export type TeamMember = {
  name: string;
  avatar: string;
  role: string;
  taskCount: number;
};

export const TEAM: TeamMember[] = [
  { name: "Alex Rivera", avatar: "AR", role: "Lead Dev", taskCount: 4 },
  { name: "Sam Patel", avatar: "SP", role: "Designer", taskCount: 3 },
  { name: "Jordan Lee", avatar: "JL", role: "Backend Dev", taskCount: 5 },
  { name: "Taylor Kim", avatar: "TK", role: "QA Engineer", taskCount: 2 },
];

export const TASKS: Task[] = [
  { id: 1, title: "Design login page UI", description: "Create wireframes and high-fidelity mockup for the customer login page", assignee: "Sam Patel", avatar: "SP", priority: "high", dueDate: "Apr 2", stage: "done", project: "Client Portal" },
  { id: 2, title: "Set up database schema", description: "Define PostgreSQL tables for users, sessions, and permissions", assignee: "Jordan Lee", avatar: "JL", priority: "high", dueDate: "Apr 3", stage: "done", project: "Client Portal" },
  { id: 3, title: "Build authentication API", description: "JWT-based auth with refresh tokens and role-based access", assignee: "Jordan Lee", avatar: "JL", priority: "high", dueDate: "Apr 5", stage: "review", project: "Client Portal" },
  { id: 4, title: "Implement dashboard layout", description: "Responsive sidebar, header, and main content area with navigation", assignee: "Alex Rivera", avatar: "AR", priority: "medium", dueDate: "Apr 7", stage: "in_progress", project: "Client Portal" },
  { id: 5, title: "Create contact list component", description: "Searchable, sortable table with pagination and bulk actions", assignee: "Alex Rivera", avatar: "AR", priority: "medium", dueDate: "Apr 8", stage: "in_progress", project: "Client Portal" },
  { id: 6, title: "Design email templates", description: "Welcome email, password reset, and notification templates", assignee: "Sam Patel", avatar: "SP", priority: "low", dueDate: "Apr 10", stage: "in_progress", project: "Client Portal" },
  { id: 7, title: "Build notification system", description: "Real-time notifications via WebSocket with database persistence", assignee: "Jordan Lee", avatar: "JL", priority: "medium", dueDate: "Apr 12", stage: "todo", project: "Client Portal" },
  { id: 8, title: "Write API documentation", description: "Swagger/OpenAPI docs for all REST endpoints", assignee: "Jordan Lee", avatar: "JL", priority: "low", dueDate: "Apr 14", stage: "todo", project: "Client Portal" },
  { id: 9, title: "QA: Test auth flows", description: "Test login, logout, password reset, and session management", assignee: "Taylor Kim", avatar: "TK", priority: "high", dueDate: "Apr 6", stage: "review", project: "Client Portal" },
  { id: 10, title: "Set up CI/CD pipeline", description: "GitHub Actions for automated testing and deployment to staging", assignee: "Alex Rivera", avatar: "AR", priority: "medium", dueDate: "Apr 9", stage: "todo", project: "Client Portal" },
  { id: 11, title: "Mobile responsive pass", description: "Ensure all pages work on iOS and Android mobile browsers", assignee: "Sam Patel", avatar: "SP", priority: "medium", dueDate: "Apr 15", stage: "todo", project: "Client Portal" },
  { id: 12, title: "QA: Integration tests", description: "End-to-end tests for critical user flows", assignee: "Taylor Kim", avatar: "TK", priority: "high", dueDate: "Apr 16", stage: "todo", project: "Client Portal" },
];

export const STAGES = [
  { id: "todo", label: "To Do", color: "bg-gray-100 text-gray-700" },
  { id: "in_progress", label: "In Progress", color: "bg-blue-100 text-blue-700" },
  { id: "review", label: "Review", color: "bg-amber-100 text-amber-700" },
  { id: "done", label: "Done", color: "bg-green-100 text-green-700" },
] as const;
