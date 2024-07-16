export default function ErrorPage({ code }: { code: number }) {
  console.log(code);
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <h1 className="text-4xl font-bold">401</h1>
    </div>
  );
}
