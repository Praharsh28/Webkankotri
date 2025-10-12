-- Add view counter function
-- This function safely increments the view count for an invitation

CREATE OR REPLACE FUNCTION increment_view_count(invitation_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.invitations
  SET view_count = COALESCE(view_count, 0) + 1
  WHERE id = invitation_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION increment_view_count(UUID) TO anon, authenticated;
