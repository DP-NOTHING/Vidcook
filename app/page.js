import Editor from "@/components/Editor";
import dynamic from "next/dynamic";

const DynamicEditor = dynamic(
  () => import('../components/Editor'),
  {
    ssr: false
  }
);
export default function Home() {

  const config = {
    license: process.env.NEXT_PUBLIC_LICENSE,
    baseURL: 'https://cdn.img.ly/packages/imgly/cesdk-js/1.27.1/assets',
    callbacks: { onUpload: 'local' }
  };
  return (
    <DynamicEditor config={config}/>
  );
}
