import dynamic from 'next/dynamic';

const Editorwrap = dynamic(
  () => import('./Editor'),
  {
    ssr: false
  }
);
export default Editorwrap;
