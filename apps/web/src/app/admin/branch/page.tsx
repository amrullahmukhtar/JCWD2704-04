"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import csrMainApi from "@/app/_lib/axios/csrMainApi";

interface IBranch {
  id: number;
  idBranch: number;
  location: string;
  branchPassword: string;
  staffSchedules?: Date;
}

export default function Page() {
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<IBranch | null>(null);
  const [newBranchLocation, setNewBranchLocation] = useState("");
  const [newBranchPassword, setNewBranchPassword] = useState("");

  const fetchBranches = async () => {
    const result = await csrMainApi().get(`/branch/`);
    setBranches(result.data.data);
  };

  const handleDeleteBranch = async () => {
    if (selectedBranch) {
      await csrMainApi().delete(`/branch/${selectedBranch.id}`);
      fetchBranches();
      setShowDeleteModal(false);
    }
  };

  const handleAddBranch = async () => {
    if (!newBranchLocation || !newBranchPassword) {
      alert("Please fill in both location and password fields.");
      return;
    }

    await csrMainApi().post(`/branch/b1`, {
      location: newBranchLocation,
      branchPassword: newBranchPassword,
    });
    fetchBranches();
    setShowAddModal(false);
    setNewBranchLocation(""); // Clear input fields after successful addition
    setNewBranchPassword("");
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <div className="container mx-auto flex justify-center flex-col max-w-[850px] py-5">
      <button
        className="mb-5 px-5 py-3 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => setShowAddModal(true)}
      >
        Add Branch
      </button>

      {branches.map((e, i) => (
        <div
          key={i}
          className="mb-5 px-5 py-3 border-b border-black flex justify-between items-center hover:shadow-lg transition-shadow duration-300"
        >
          <Link href={`/admin/branch/${e.id}`}>
            <h1 className="text-xl">{e.location}</h1>
          </Link>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              setSelectedBranch(e);
              setShowDeleteModal(true);
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded">
            <p>Apakah kamu yakin menghapus branch ini?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDeleteBranch}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded">
            <h2 className="text-xl mb-4">Add New Branch</h2>
            <div className="mb-4">
              <label className="block mb-2">Location</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded"
                value={newBranchLocation}
                onChange={(e) => setNewBranchLocation(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Branch Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded"
                value={newBranchPassword}
                onChange={(e) => setNewBranchPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleAddBranch}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
