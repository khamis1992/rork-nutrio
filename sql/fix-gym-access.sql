-- Fix gym_access column issue
-- First, check if the column exists
DO $$
BEGIN
    -- Add gym_access column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'subscriptions' 
        AND column_name = 'gym_access'
    ) THEN
        ALTER TABLE subscriptions ADD COLUMN gym_access BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Ensure the column has the correct type and default
ALTER TABLE subscriptions ALTER COLUMN gym_access SET DEFAULT FALSE;
ALTER TABLE subscriptions ALTER COLUMN gym_access SET NOT NULL;

-- Update any existing records that might have NULL values
UPDATE subscriptions SET gym_access = FALSE WHERE gym_access IS NULL;

-- Refresh the schema cache by updating the table comment
COMMENT ON TABLE subscriptions IS 'User subscription data with gym access - updated';