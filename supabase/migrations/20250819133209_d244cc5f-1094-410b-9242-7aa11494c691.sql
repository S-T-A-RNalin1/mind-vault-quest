-- Fix linter: set search_path and use SECURITY DEFINER for the function
CREATE OR REPLACE FUNCTION public.get_level_leaderboard(level_num INTEGER, limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  player_name TEXT,
  completion_time INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE
) 
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;