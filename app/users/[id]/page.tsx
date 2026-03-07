import { getUserById } from "@/lib/data/users";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function PageUserDetails({params}: {params: Promise<{id: string}>}){
    const {id} = await params;
    const user = await getUserById(id);
    
    if (!user) {
        notFound();
    }
    
    return (
        <main className="w-[80%] max-w-6xl mx-auto py-10 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="h-10 bg-linear-to-r from-blue-400 to-blue-600"></div>
                
                <div className="px-8 pb-8">
                    <div className="flex items-end gap-6 -mt-12 mb-6">
                        <div className="relative">
                            {user.avatar ? (
                                <Image
                                    width={200}
                                    height={300} 
                                    src={user.avatar} 
                                    alt={user.name}
                                    className="w-24 h-24 rounded-xl border-4 border-white shadow-lg object-cover bg-white"
                                />
                            ) : (
                                <div className="w-24 h-24  rounded-xl border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
                                    <span className="text-3xl text-gray-400">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex-1  pb-1">
                            <h2 className="text-2xl pt-15 font-bold text-gray-900">{user.name}</h2>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                        <div className="pb-1">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium
                                ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                                  user.role === 'user' ? 'bg-blue-100 text-blue-700' : 
                                  'bg-gray-100 text-gray-700'}`}>
                                {user.role}
                            </span>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                                Account Details
                            </h3>
                            
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">ID</span>
                                    <span className="font-medium text-gray-900">#{user.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Email</span>
                                    <span className="font-medium text-gray-900">{user.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Password</span>
                                    <span className="font-medium text-gray-400">••••••••</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Role</span>
                                    <span className="font-medium text-gray-900">{user.role}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                                System Info
                            </h3>
                            
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Created</span>
                                    <span className="font-medium text-gray-900">
                                        {new Date(user.creationAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Last Updated</span>
                                    <span className="font-medium text-gray-900">
                                        {new Date(user.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Status</span>
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-sm">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            Edit Profile
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                            Change Password
                        </button>
                        <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium ml-auto">
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Simple Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="text-xl font-semibold text-gray-900">#{user.id}</p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-xl font-semibold text-gray-900">
                        {new Date(user.creationAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">Last Update</p>
                    <p className="text-xl font-semibold text-gray-900">
                        {new Date(user.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                </div>
            </div>
        </main>
    );
}