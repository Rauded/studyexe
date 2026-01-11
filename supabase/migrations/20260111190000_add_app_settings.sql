-- Create app_settings table
create table public.app_settings (
  user_id uuid references auth.users not null primary key,
  strict_mode boolean default false,
  eye_tracking boolean default true,
  session_length integer default 50,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.app_settings enable row level security;

-- Create policies
create policy "Users can view own app settings"
  on public.app_settings for select
  using ( auth.uid() = user_id );

create policy "Users can insert own app settings"
  on public.app_settings for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own app settings"
  on public.app_settings for update
  using ( auth.uid() = user_id );

-- Trigger to create default settings on user signup
create or replace function public.handle_new_user_settings()
returns trigger as $$
begin
  insert into public.app_settings (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created_settings
  after insert on auth.users
  for each row execute procedure public.handle_new_user_settings();
