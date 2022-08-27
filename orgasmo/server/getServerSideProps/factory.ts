import type { FactoryParameters } from '../../types';
import type { GetServerSideProps } from 'next';

import getPage from './getPage';

export default function getServerSidePropsFactory ({ driver }: FactoryParameters): GetServerSideProps {
  return async function GetServerSideProps (ctx: any) {
    return getPage({ ctx, driver })
  }
}

