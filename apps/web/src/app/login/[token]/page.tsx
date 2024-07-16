import ssrMainApi from "@/app/_lib/axios/ssrMainApi";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: {
    token: string;
  };
};

export default function page({ params }: Props) {
  return (
    <Suspense fallback={<div className="spinner"></div>}>
      <Result token={params.token} />
    </Suspense>
  );
}

async function Result({ token }: { token: string }) {
  const a: string = await ssrMainApi(token)
    .post("/user/verify")
    .then((res) => res.data.message)
    .catch((e) => e.message as string);
  return (
    <>
      <Suspense fallback={<h2>{a}</h2>}>
        <RedirectComponent />
      </Suspense>
    </>
  );
}

async function RedirectComponent() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  redirect("/");
  return <></>;
}
