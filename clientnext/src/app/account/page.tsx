import { Suspense } from 'react';
import { AccountPage } from '@/components/AccountPage/AccountPage';

const Account = () => {
  return (
    <Suspense>
      <AccountPage />
    </Suspense>
  )
}

export default Account