// // src/features/user/UserProfile.tsx
// // import { useAuth } from '@/features/auth/authSlice';

// const UserProfile = () => {
//   const { user } = useAuth();

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="bg-white shadow p-6 rounded-md max-w-lg mx-auto">
//       <h2 className="text-xl font-semibold mb-4">My Profile</h2>
//       <div className="space-y-3">
//         <div>
//           <span className="font-medium text-gray-700">Name:</span> {user.first_name} {user.last_name}
//         </div>
//         <div>
//           <span className="font-medium text-gray-700">Email:</span> {user.email}
//         </div>
//         <div>
//           <span className="font-medium text-gray-700">Role:</span> {user.role}
//         </div>
//         <div>
//           <span className="font-medium text-gray-700">Phone:</span> {user.contact_phone || 'N/A'}
//         </div>
//         <div>
//           <span className="font-medium text-gray-700">Address:</span> {user.address || 'N/A'}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;
