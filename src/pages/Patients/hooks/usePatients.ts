import { useQuery } from "@tanstack/react-query";

import { Patient } from "#models/index.ts";
import { getPatients } from "../services/patients";
import { filterPatients } from "../utils/filterPatients";
import { buildFilterConfig } from "../utils/usePatientFilter";

interface FilterValues {
  name?: string;
  primaryCondition?: string;
  minAge?: number;
  gender?: "" | Patient["gender"];
}

export const usePatients = (filters: FilterValues) => {
  return useQuery({
    queryKey: ["patients", filters],
    queryFn: getPatients,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 4,
    retryDelay: (attempt) => attempt * 5000,
    select: (data) => {
      const filterConfig = buildFilterConfig(filters);
      return filterPatients(data, filterConfig);
    },
  });
};