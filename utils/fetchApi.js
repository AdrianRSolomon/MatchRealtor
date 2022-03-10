import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  const { data } = await axios.get((url), {
    headers: {
        'x-rapidapi-host': 'bayut.p.rapidapi.com',
        'x-rapidapi-key': '3adbb86014msha2d66d7414b5138p12e785jsn71fe1b2bec3c'
    },
  });
    
  return data;
}