import { Fragment } from 'react';
import LoaderEnter from '@/app/fragments/loader/loader-enter';
import LoaderInteractive from '@/app/fragments/loader/loader-interactive';
import LoaderExit from '@/app/fragments/loader/loader-exit';

export default function Loader() {
  return (
    <Fragment>
      <LoaderEnter />
      <LoaderInteractive />
      <LoaderExit />
    </Fragment>
  );
}
