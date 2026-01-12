import { createClient } from '@/utils/supabase/server';
import { Navbar as LandingNavbar } from '@/components/landing-ui/Sections';

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <LandingNavbar user={user} />;
}
