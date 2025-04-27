import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../services/patients";
import { Gender } from "../../../interfaces";
import { useEffect, useState } from "react";

export const usePatients = ({
  gender,
  selectedConditions,
  minAge,
  maxAge,
}: {
  gender: Gender;
  selectedConditions: string[];
  minAge: number | null;
  maxAge: number | null;
}) => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const patientsQuery = useQuery({
    queryKey: ["patients", { gender, selectedConditions, minAge, maxAge, page, pageSize }],
    queryFn: () =>
      getPatients({ gender, selectedConditions, minAge, maxAge, page, pageSize }),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 4,
    retryDelay: (attempt) => attempt * 5000,
  });

  useEffect(() => {
    setPage(1)
  }, [gender, selectedConditions, minAge, maxAge])

  const nextPage = () => {
    if (patientsQuery.data?.data.length === 0) return;
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (page === 1) return;
    setPage((prevPage) => prevPage - 1);
  };

  return { patientsQuery, page, nextPage, prevPage };
};
