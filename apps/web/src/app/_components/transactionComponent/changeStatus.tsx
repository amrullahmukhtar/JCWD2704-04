"use client";
import React from "react";
import BackEndForm from "../formComponent/backEndForm";
import { useRouter } from "next/navigation";

export default function ChangeStatus({
  transactionId,
}: {
  transactionId: number;
}) {
  const router = useRouter();
  return (
    <BackEndForm
      action={`/transaction/invoice/${transactionId}`}
      method="patch"
      data={{ isPaid: true }}
      onSuccess={() => router.refresh()}
    >
      <input
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2"
        type="Submit"
        value="Bayar"
      />
    </BackEndForm>
  );
}
