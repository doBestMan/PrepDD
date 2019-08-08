import React from 'react';
import {Router as ReachRouter} from '@reach/router';
import ManagementPage from '../team/TeamManagement';

export default function Router(props: {path: string}) {
  return (
    <ReachRouter>
      <ManagementPage path="/mgmt" />
    </ReachRouter>
  );
}