// Login.tsx
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login, userSession, isAuthenticated, error } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) navigate('/dashboard');
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (loginForm: any) => {
    login(loginForm);
    console.log('Datos de la sesion: ', userSession);
  })
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <form
          onSubmit={onSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            {...register("email", { required: true })}
            placeholder="Correo Electrónico"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          {errors.email && <p className="text-red-500 text-sm">El correo es requerido</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Contraseña"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          {errors.password && <p className="text-red-500 text-sm">La contraseña es requerida</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
