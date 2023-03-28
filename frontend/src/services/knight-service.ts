import { knightApi } from "@/api/knightsApi";
import { FormatedKnight, RawKnight } from "@/types/Knight";


interface GetFormatedKnightsResponse {
  message: string;
  knights: FormatedKnight[];
}

interface GetRawKnightResponse {
  message: string;
  knight: RawKnight;
}

interface DeleteKnightResponse {
  message: string;
}

interface UpdateKnightResponse {
  message: string;
}

interface CreateKnightResponse {
  message: string;
  knight: RawKnight
}

const getFormatedKnights = async (hero: boolean): Promise<FormatedKnight[]> => {
  const { data } = await knightApi.get<GetFormatedKnightsResponse>(hero ? '/?filter=heroes' : '/');

  return data.knights;
}

const getRawKnight = async (id: string): Promise<RawKnight> => {
  const { data } = await knightApi.get<GetRawKnightResponse>('/' + id);

  return data.knight;
}

const deleteKnight = async (id: string): Promise<string> => {
  const { data } = await knightApi.delete<DeleteKnightResponse>('/' + id);

  return data.message;
}

const updateKnight = async (id: string, nickname: string): Promise<string> => {
  const { data } = await knightApi.put<UpdateKnightResponse>('/' + id, { nickname });

  return data.message;
}

const createKnight = async (knight: RawKnight): Promise<RawKnight> => {
  const { data } = await knightApi.post<CreateKnightResponse>('/', { ...knight });

  return data.knight;
}

export { getFormatedKnights, getRawKnight, deleteKnight, updateKnight, createKnight };