// // src/lib/generateMetadata.ts
// import axios from 'axios';
// import { redirect, notFound } from 'next/navigation';

// export async function generateMetadata({ params }: { params: { profileName: string } }) {
//   const { profileName } = params;

//   try {
//     const response = await axios.get(`http://localhost:3000/api/profiles/${encodeURIComponent(profileName)}`);
//     return {
//       props: {
//         profile: response.data,
//         error: null,
//       }
//     };
//   } catch (error: any) {
//     if (error.response?.status === 403) {
//       redirect('/');
//     } else if (error.response?.status === 404) {
//       notFound();
//     } else {
//       return {
//         props: {
//           profile: null,
//           error: 'Erro ao buscar o perfil.'
//         }
//       };
//     }
//   }
// }
