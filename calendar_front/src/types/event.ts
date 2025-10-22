export interface EventData {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  color: string;
  created_at: string;
  updated_at: string;
}
export interface EventRequestBody {
  title: string;
  start_date: string;
  end_date: string;
  color: string;
}
