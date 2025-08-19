-- Create leaderboard table for storing completion times
CREATE TABLE public.leaderboard (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name TEXT NOT NULL,
  level_id INTEGER NOT NULL CHECK (level_id >= 1 AND level_id <= 10),
  completion_time INTEGER NOT NULL, -- Time in seconds
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  session_id UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (but allow public read and insert for demo purposes)
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to view leaderboard entries (public leaderboard)
CREATE POLICY "Anyone can view leaderboard entries" 
ON public.leaderboard 
FOR SELECT 
USING (true);

-- Policy to allow anyone to insert leaderboard entries
CREATE POLICY "Anyone can insert leaderboard entries" 
ON public.leaderboard 
FOR INSERT 
WITH CHECK (true);

-- Create index for better performance on queries
CREATE INDEX idx_leaderboard_level_time ON public.leaderboard (level_id, completion_time);
CREATE INDEX idx_leaderboard_completed_at ON public.leaderboard (completed_at DESC);

-- Create function to get top times for a specific level
CREATE OR REPLACE FUNCTION public.get_level_leaderboard(level_num INTEGER, limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  player_name TEXT,
  completion_time INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    l.id,
    l.player_name,
    l.completion_time,
    l.completed_at
  FROM public.leaderboard l
  WHERE l.level_id = level_num
  ORDER BY l.completion_time ASC, l.completed_at ASC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql STABLE;