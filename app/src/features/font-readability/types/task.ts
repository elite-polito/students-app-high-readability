export type Story = {
  content: string;
  question: string;
  options: string[];
  correctOption: string;
}

export type Question = {
  statement: string;
  options: string[];
  correctOption: string;
}