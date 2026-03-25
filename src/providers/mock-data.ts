import { Subject } from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: "CS101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    description:
      "Fundamentals of programming, algorithms, and computational thinking using Python.",
    createAt: new Date().toISOString(),
  },
  {
    id: 2,
    code: "MATH201",
    name: "Calculus I",
    department: "Mathematics",
    description:
      "Limits, derivatives, and integrals of single-variable functions with real-world applications.",
    createAt: new Date().toISOString(),
  },
  {
    id: 3,
    code: "ENG301",
    name: "Technical Writing",
    department: "English",
    description:
      "Principles of clear and effective writing for engineering and science professionals.",
    createAt: new Date().toISOString(),
  },
];
