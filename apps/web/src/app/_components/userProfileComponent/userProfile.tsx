"use client";

import { useRouter } from "next/navigation";

import React, { ChangeEvent, useState } from "react";
import BackEndForm from "../formComponent/backEndForm";

interface WorkExperience {
  position: string;
  company: string;
  duration: string;
  tasks: string[];
}

interface Education {
  degree: string;
  institution: string;
  duration: string;
}

interface UserProfileData {
  name: string;
  jobTitle: string;
  location: string;
  phone: string;
  email: string;
  profileImage?: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
}

export default function UserProfile() {
  const router = useRouter();
  const [input, setInput] = useState<UserProfileData>({
    name: "Amrullah Mukhtar",
    jobTitle: "Auditor Junior",
    location: "Bogor, Jawa Barat",
    phone: "+628151334410",
    email: "amrullahmukhtar@gmail.com",
    workExperience: [
      {
        position: "Auditor Junior",
        company: "KAP JEPTHA NASIB & JUNIHOL",
        duration: "Januari 2020 - Maret 2020 (3 bulan)",
        tasks: [
          "Mengelompokkan transaksi berdasarkan jenisnya menggunakan Excel",
          "Mencari hubungan transaksi menggunakan Excel",
          "Mengcek atas kebenaran sample transaksi dengan bukti yang bisa dipertanggung jawabkan",
          "Mengedit dan memeriksa kembali draft laporan sebelum diberikan kepada klien",
        ],
      },
      {
        position: "Auditor Junior",
        company: "KAP Yaniswar dan Rekan",
        duration: "Juni 2019 - Juli 2019 (2 bulan)",
        tasks: [
          "Memeriksa invoice atas persetujuan yang di audit",
          "Melakukan cek fisik atas sample invoice yang diambil",
          "Mengelompokkan transaksi perusahaan berdasarkan jenisnya",
          "Mengenal sistem pencatatan akuntansi yang digunakan oleh klien dalam mencatat transaksinya",
        ],
      },
    ],
    education: [
      {
        degree: "D3 Akuntansi",
        institution: "Institut Pertanian Bogor",
        duration: "Juli 2017 - Agustus 2020 (3 tahun)",
      },
    ],
    skills: [
      "Kerja Tim",
      "Microsoft Excel",
      "Akuntansi",
      "Microsoft Word",
      "Microsoft Office",
      "Administrasi",
    ],
  });

  const inputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section?: string,
    index?: number,
    subIndex?: number
  ) => {
    const { id, value } = e.target;

    if (section && typeof index === "number") {
      if (typeof subIndex === "number") {
        setInput((prevState) => ({
          ...prevState,
          [section]: prevState[section].map((item, i) =>
            i === index
              ? {
                  ...item,
                  tasks: item.tasks.map((task, j) =>
                    j === subIndex ? value : task
                  ),
                }
              : item
          ),
        }));
      } else {
        setInput((prevState) => ({
          ...prevState,
          [section]: prevState[section].map((item, i) =>
            i === index ? { ...item, [id]: value } : item
          ),
        }));
      }
    } else {
      setInput({ ...input, [id]: value });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setInput((prevState) => ({
        ...prevState,
        profileImage: URL.createObjectURL(e.target.files[0]),
      }));
    }
  };

  return (
    <BackEndForm
      action="/profile/update"
      method="post"
      onSuccess={() => {
        router.refresh();
      }}
      data={input}
    >
      <div className="flex flex-col p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
        <div className="flex flex-col items-center mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
          <img
            className="w-24 h-24 rounded-full"
            src={input.profileImage || "default_profile_image.jpg"}
            alt="Profile"
          />
          <input
            type="text"
            id="name"
            value={input.name}
            onChange={inputHandler}
            className="text-xl font-bold mt-2 text-center"
          />
          <input
            type="text"
            id="jobTitle"
            value={input.jobTitle}
            onChange={inputHandler}
            className="text-gray-600 text-center"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="font-bold">Location:</label>
          <input
            type="text"
            id="location"
            value={input.location}
            onChange={inputHandler}
            className="mb-2"
          />
          <label className="font-bold">Phone:</label>
          <input
            type="text"
            id="phone"
            value={input.phone}
            onChange={inputHandler}
            className="mb-2"
          />
          <label className="font-bold">Email:</label>
          <input
            type="text"
            id="email"
            value={input.email}
            onChange={inputHandler}
            className="mb-2"
          />
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-lg mb-2">Work Experience</h2>
          {input.workExperience.map((work, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                id="position"
                value={work.position}
                onChange={(e) => inputHandler(e, "workExperience", index)}
                className="font-bold"
              />
              <input
                type="text"
                id="company"
                value={work.company}
                onChange={(e) => inputHandler(e, "workExperience", index)}
                className="text-gray-600"
              />
              <input
                type="text"
                id="duration"
                value={work.duration}
                onChange={(e) => inputHandler(e, "workExperience", index)}
                className="text-gray-600"
              />
              <ul className="list-disc ml-4">
                {work.tasks.map((task, taskIndex) => (
                  <li key={taskIndex}>
                    <input
                      type="text"
                      value={task}
                      onChange={(e) =>
                        inputHandler(e, "workExperience", index, taskIndex)
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-lg mb-2">Education</h2>
          {input.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                id="degree"
                value={edu.degree}
                onChange={(e) => inputHandler(e, "education", index)}
                className="font-bold"
              />
              <input
                type="text"
                id="institution"
                value={edu.institution}
                onChange={(e) => inputHandler(e, "education", index)}
                className="text-gray-600"
              />
              <input
                type="text"
                id="duration"
                value={edu.duration}
                onChange={(e) => inputHandler(e, "education", index)}
                className="text-gray-600"
              />
            </div>
          ))}
        </div>
        <div className="mb-4">
          <h2 className="font-bold text-lg mb-2">Skills</h2>
          {input.skills.map((skill, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) =>
                  setInput((prevState) => ({
                    ...prevState,
                    skills: prevState.skills.map((s, i) =>
                      i === index ? e.target.value : s
                    ),
                  }))
                }
              />
            </div>
          ))}
        </div>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </BackEndForm>
  );
}
