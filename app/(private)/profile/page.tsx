import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <h1>Profile Page</h1>
    </ProtectedRoute>
  );
}
