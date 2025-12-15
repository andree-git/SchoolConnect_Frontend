import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AdminPanel } from '../components/AdminPanel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User, School, Shield } from 'lucide-react';
import { AuthService } from '../services/auth';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const isOwner = AuthService.isOwner();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const getUserDisplayName = () => {
    if (user?.nombre && user?.apellido) {
      return `${user.nombre} ${user.apellido}`;
    }
    if (user?.nombre) {
      return user.nombre;
    }
    if (user?.apellido) {
      return user.apellido;
    }
    return user?.email || 'Usuario';
  };

  const getUserInitials = () => {
    if (user?.nombre && user?.apellido) {
      return `${user.nombre.charAt(0)}${user.apellido.charAt(0)}`.toUpperCase();
    }
    if (user?.nombre) {
      return user.nombre.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <School className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">SchoolConnect</h1>
              {isOwner && (
                <div className="flex items-center space-x-1 bg-red-100 px-2 py-1 rounded-full">
                  <Shield className="h-4 w-4 text-red-600" />
                  <span className="text-xs font-medium text-red-600">OWNER</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">
                    {getUserDisplayName()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {user?.rol?.toUpperCase() || 'USER'}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido de vuelta, {getUserDisplayName()}!
          </h2>
          <p className="text-gray-600">
            {isOwner 
              ? 'Panel de administración principal - Acceso completo al sistema'
              : 'Has iniciado sesión exitosamente en SchoolConnect'
            }
          </p>
        </div>

        {/* Admin Panel - Solo visible para usuarios con rol 'owen' */}
        {isOwner ? (
          <AdminPanel />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Perfil de Usuario</span>
                </CardTitle>
                <CardDescription>
                  Información de tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {user?.email}
                  </p>
                  {user?.nombre && (
                    <p className="text-sm">
                      <span className="font-medium">Nombre:</span> {user.nombre}
                    </p>
                  )}
                  {user?.apellido && (
                    <p className="text-sm">
                      <span className="font-medium">Apellido:</span> {user.apellido}
                    </p>
                  )}
                  <p className="text-sm">
                    <span className="font-medium">Rol:</span> {user?.rol?.toUpperCase()}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">ID:</span> {user?.id}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estado de Sesión</CardTitle>
                <CardDescription>
                  Información de tu sesión actual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Conectado</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Sesión iniciada correctamente
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>
                  Funciones disponibles del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Ver Perfil Completo
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Configuración
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Ayuda y Soporte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}