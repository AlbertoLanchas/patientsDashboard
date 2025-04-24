import { sleep } from "../../../utils/sleep";
import { Patient } from "../../../interfaces";

export const getPatient = async (id: string): Promise<Patient> => {
  await sleep(2);
  const response = await fetch(`/api/patients/${id}`);

  return response.json();
};
