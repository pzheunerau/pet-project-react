import axios from "axios";

import { useHttp } from "../hooks/http.hook";
import { AXIOS_BASE_URL } from "../libs/consts";

const usePlaceholderService = () => {

  const { loading, error, request, clearError } = useHttp();

  const api = axios.create({
    baseURL: AXIOS_BASE_URL,
  });

  const getAllAlbums = async () => {
    const res = await api.get('albums');
    return res.data;
  }

  const getAlbumById = async (id) => {
    const res = await api.get(`albums/${id}`);
    return res.data;
  }

  const createAlbum = async (album) => {
    const res = await api.post('albums', {
      title: album.title,
      userId: album.userId,
    })
    console.log(res);
  }

  const deleteAlbumById = async (id) => {
    const res = await api.delete(`albums/${id}`);
    console.log(res);
  }

  const editAlbum = async (album, id) => {
    const res = await api.patch(`albums/${id}`, {
      title: album.title,
      userId: album.userId,
    });
    console.log(res);
  }

  const getAllUsers = async () => {
    const res = await api.get('users');
    return res.data;
  }

  const getUserById = async (id) => {
    const res = await api.get(`users/${id}`);
    return res.data;
  }

  const getAlbumPhotos = async (id) => {
    const res = await api.get(`albums/${id}/photos`)
    return res.data;
  }

  const getAllPosts = async () => {
    const res = await request('posts');
    return res;
  }

  const getPostById = async (id) => {
    const res = await api.get(`posts/${id}`);
    return res.data;
  }
  
  return {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    deleteAlbumById,
    editAlbum,
    getAllUsers,
    getUserById,
    getAlbumPhotos,
    getAllPosts,
    getPostById,
    loading,
    error,
    clearError
  }
}

export default usePlaceholderService;