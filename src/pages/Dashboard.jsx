import { Helmet } from 'react-helmet-async';
import PageHeading from '../components/PageHeading';

export default function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageHeading>Dashboard</PageHeading>
    </>
  );
}
