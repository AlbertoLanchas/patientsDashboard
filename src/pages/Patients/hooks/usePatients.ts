import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../services/patients";

export const usePatients = () => {
  const patientsQuery = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 4,
    retryDelay: (attempt) => attempt * 5000,
  });

  return {
    patientsQuery,
  };
};
