import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiLock, FiEdit } from "react-icons/fi";
import { updateUser } from "../services/useServices";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // Add setUser from context

  const [formData, setFormData] = useState({
    name: "",
    oldpassword: "",
    newpassword: "",
    confirmPassword: "",
    image: "",
  });
  const [isLoading, setState] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        name: user.name || "",
        image: user.image || "",
      }));
    }
  }, [user]);

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "newpassword" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState(true);

    if (!formData.oldpassword) {
      setPasswordError("Debes introducir tu contraseña actual");
      setState(false);
      return;
    }

    if (formData.newpassword !== formData.confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      setState(false);
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        oldpassword: formData.oldpassword,
        newpassword: formData.newpassword,
      };

      const updatedUser = await updateUser(user.id, updateData);
      setUser(updatedUser);
      setState(false); // Reset loading state before navigation
      navigate("/profile");
    } catch (error) {
      setPasswordError(error.message);
      setState(false);
    }
  };

  return (
    <div className="min-w-4xl bg-gray-100 py-8 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-t-2xl shadow-lg p-12 mb-1 relative">
          <div className="absolute top-20 right-30">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200">
                <img
                  src={formData.image}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2 ml-15">
            Editar Perfil
          </h2>
          <p className="text-gray-600 ml-15">
            Actualiza tu información personal
          </p>
        </div>

        <div className="bg-white rounded-b-2xl shadow-lg p-20">
          <form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-5xl">
            <div>
              <h3 className="text-3xl font-semibold text-gray-900 mb-6 ml-6">
                Información Personal
              </h3>
              <div className="grid grid-cols-1 gap-10 px-6">
                <div className="w-full">
                  <label className="block text-lg font-semibold text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <FiUser className="text-gray-500" />
                      Nombre
                    </div>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    <div className="flex items-center gap-2">
                      <FiLock className="text-gray-500" />
                      Contraseña Actual
                    </div>
                  </label>
                  <input
                    type="password"
                    name="oldpassword"
                    value={formData.oldpassword}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    <div className="flex items-center gap-2">
                      <FiLock className="text-gray-500" />
                      Nueva Contraseña
                    </div>
                  </label>
                  <input
                    type="password"
                    name="newpassword"
                    value={formData.newpassword}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    <div className="flex items-center gap-2">
                      <FiLock className="text-gray-500" />
                      Confirmar Nueva Contraseña
                    </div>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-6 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="px-8 py-4 rounded-lg border border-gray-300 text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 hover:cursor-pointer transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 rounded-lg bg-black text-lg font-medium text-white hover:bg-gray-800 hover:cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
