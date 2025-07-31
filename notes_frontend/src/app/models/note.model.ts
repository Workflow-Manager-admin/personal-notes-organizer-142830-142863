export interface Note {
  id: string;
  title: string;
  content: string;
  categoryId?: string;
  createdAt: number;
  updatedAt: number;
}
