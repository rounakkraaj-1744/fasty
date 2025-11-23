import { ReactNode } from "react";

export interface SidebarItem {
  title: string;
  slug: string;
}

export interface SidebarSection {
  category: string;
  items: SidebarItem[];
}

export interface DocContent {
  title: string;
  description: string;
  content: ReactNode;
}

export type DocMap = Record<string, DocContent>;

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}
