export const getAlbumById = (id, albumsList) => {
  const album = albumsList.find(item => item.albumId === Number(id));
  return album;
}

export const isLogined = () => {
  return !!localStorage.getItem('isLogined');
}