export default function Page({ params }: { params: { test: string } }) {
  return <div>My Post: {params.test}</div>;
}
