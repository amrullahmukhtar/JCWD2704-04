import csrMainApi from "@/app/_lib/axios/csrMainApi";
import React, { FormEvent, ReactNode } from "react";

interface BackEndFormProps {
  action: string;
  method: "get" | "post" | "patch" | "delete";
  children: ReactNode; // Menambahkan children sebagai ReactNode
  className?: string;
  onSuccess: (res: any) => void;
  onFail?: (error: any) => void;
  data: { [key: string]: any };
}

const BackEndForm: React.FC<BackEndFormProps> = ({
  action,
  method,
  children, // Memasukkan children di sini
  className,
  onSuccess,
  onFail,
  data,
}) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(data);
      let res;
      switch (method) {
        case "post":
          res = await csrMainApi().post(action, data);
          break;
        case "get":
          res = await csrMainApi().get(action, { params: data });
          break;
        case "patch":
          res = await csrMainApi().patch(action, data);
          break;
        case "delete":
          res = await csrMainApi().delete(action, { data });
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      onSuccess(res);
    } catch (error) {
      if (onFail) {
        onFail(error);
      } else {
        console.error("Form submission error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children} {/* Me-render children di dalam form */}
    </form>
  );
};

export default BackEndForm;
