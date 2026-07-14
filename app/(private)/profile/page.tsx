import { redirect } from 'next/navigation';

// saved stories tab is active by default
export default function ProfilePage() {
  redirect('/profile/saved');
}
