import LoginForm from '../_components/login-form';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
    <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<div className="text-xl font-medium">loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
    </>
  );
}