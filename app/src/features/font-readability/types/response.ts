export type Response = {
  tester_id: number;
  question_id: number;
  question_type: 'read' | 'read_check_1' | 'read_check_2' | 'read_check_3' | 'pick';
  font_id: number;
  is_correct: boolean;
  time_ms: number;
}