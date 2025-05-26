"use client";

import useSWR, { mutate } from "swr";

import { getAllFaceEmbeddings, updateFaceLabel } from "@/lib/libsql";
import { DataTable } from "./composites/data-table";
import { EditableField } from "./editable-field";

export const UniqueFacesTable = () => {
  const { data: faceResults } = useSWR("faces", getAllFaceEmbeddings);

  const handleLabelChange = async (id: number, newLabel: string) => {
    await updateFaceLabel(id, newLabel);
    mutate("faces"); // Revalidate the data after updating
  };

  const tableRows = faceResults?.map((face) => ({
    id: face.id,
    label: (
      <EditableField
        value={face.label ?? "N/A"}
        onSubmit={(newLabel) => handleLabelChange(face.id, newLabel)}
      />
    ),
  }));

  return (
    <DataTable
      data={tableRows || []}
      title="Rostos detectados"
      columns={{ id: "ID", label: "Nome" }}
      isLoading={!faceResults || faceResults?.length === 0}
      className="w-full max-w-sm lg:max-h-[calc(100vh/1.5)]"
    />
  );
};
