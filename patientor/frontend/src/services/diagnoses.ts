import axios from "axios";
import { Diagnoses} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnoses[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

const getOne = async (code: string) => {
  try {
  const diagnoses = await getAll();
  return diagnoses.find((d) => d.code === code);
  } catch (e) {
    console.error(e);
  }
}

export default {
  getAll,
  getOne
};