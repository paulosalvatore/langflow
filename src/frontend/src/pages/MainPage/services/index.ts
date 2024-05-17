import { BASE_URL_API } from "../../../constants/constants";
import { api } from "../../../controllers/API/api";
import { FlowType } from "../../../types/flow";
import { AddFolderType, FolderType } from "../entities";

export async function getFolders(): Promise<FolderType[]> {
  try {
    const response = await api.get(`${BASE_URL_API}folders/`);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export async function addFolder(data: AddFolderType) {
  const body = {
    name: data.name,
    description: data.description,
    flows_list: data.flows ?? [],
    components_list: data.components ?? [],
  };

  try {
    const response = await api.post(`${BASE_URL_API}folders/`, body);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export async function updateFolder(body: FolderType, folderId: string) {
  try {
    const response = await api.patch(
      `${BASE_URL_API}folders/${folderId}`,
      body,
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteFolder(folderId: string) {
  try {
    const response = await api.delete(`${BASE_URL_API}folders/${folderId}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export async function getFolderById(folderId: string) {
  try {
    const response = await api.get(`${BASE_URL_API}folders/${folderId}`);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export async function getStarterProjects() {
  try {
    const response = await api.get(`${BASE_URL_API}folders/starter-projects`);
    return response?.data;
  } catch (error) {
    throw error;
  }
}

export async function downloadFlowsFromFolders(
  folderId: string,
): Promise<{ flows: FlowType[]; folder_name: string }> {
  try {
    const response = await api.get(
      `${BASE_URL_API}folders/download/${folderId}`,
    );
    if (response?.status !== 200) {
      throw new Error(`HTTP error! status: ${response?.status}`);
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadFlowsFromFolders(
  flows: FormData,
  folderId: string,
) {
  try {
    const response = await api.post(
      `${BASE_URL_API}folders/upload/${folderId}`,
      flows,
    );

    if (response?.status !== 201) {
      throw new Error(`HTTP error! status: ${response?.status}`);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
