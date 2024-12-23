import apiClient from "./apiClient";

const usePlaceholderService = () => {
  const createAlbum = async (album) => {
    const res = await apiClient.post('albums', {
      title: album.title,
      userId: album.userId,
    })
    console.log(res);
  }

  const deleteAlbumById = async (id) => {
    const res = await apiClient.delete(`albums/${id}`);
    console.log(res);
  }

  const editAlbum = async (album, id) => {
    const res = await apiClient.patch(`albums/${id}`, {
      title: album.title,
      userId: album.userId,
    });
    console.log(res);
  }
  
  return {
    createAlbum,
    deleteAlbumById,
    editAlbum,
  }
}

export default usePlaceholderService;