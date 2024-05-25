import TestLayout from '../components/layout/test/testlayout';

export default function Test1Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TestLayout>{children}</TestLayout>;
}
