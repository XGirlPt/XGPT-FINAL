import axios from "axios";

// Tipagem para Coordenadas
interface Coordinates {
  lat: number;
  lng: number;
}

// Função para obter coordenadas de um endereço usando a API Geocoding
export const fetchCoordinates = async (address: string): Promise<Coordinates> => {
  const API_KEY = "AIzaSyC9gd59nW47Bg63ksUnNd2HmigKDUDGA7E"; // Substitua por sua chave
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;
  
  try {
    const response = await axios.get(url);

    // Verifique se a resposta contém resultados
    if (response.data.status === "OK" && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      console.error("Google Maps API não encontrou resultados válidos para o endereço:", address);
      return { lat: 0, lng: 0 };  // Retor
    }
  } catch (error: any) {
    console.error("Erro ao buscar coordenadas:", error.message);
    return { lat: 0, lng: 0 };  // Ret
  }

};
