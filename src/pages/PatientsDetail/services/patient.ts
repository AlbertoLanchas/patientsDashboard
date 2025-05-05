import { Patient } from "../../../models";
import { sleep } from "../../../utils/sleep";

export const getPatient = async (id: string): Promise<Patient> => {
  await sleep(2);
  const response = await fetch(`/api/patients/${id}`);

  return response.json();
};
