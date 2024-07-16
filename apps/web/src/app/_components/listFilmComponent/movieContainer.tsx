import { ReactNode, Suspense } from "react";
import Loading1 from "../loadingComponent/loading1";
type Props = { children: ReactNode; text: string };

export default function MovieContainer({ children, text }: Props) {
  return (
    <div className="bg-white min-h-screen">
      <main className="bg-gray-100 min-h-screen">
        <div className="container mx-auto flex justify-center flex-col max-w-[800px] p-4">
          <h2 className="text-2xl font-semibold mb-4">{text}</h2>
          <Suspense fallback={<Loading1 />}>
            <div className="flex flex-wrap justify-start mx-2">{children}</div>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
