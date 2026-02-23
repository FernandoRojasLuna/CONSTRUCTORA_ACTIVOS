# Constructora Activos

Sistema de gestión de activos y equipos para constructoras.

## Descripción

Aplicación web para la gestión integral de activos empresariales que incluye:

- **Gestión de Sedes**: Administración de las diferentes ubicaciones de la empresa.
- **Control de Equipos**: Inventario y seguimiento de equipos y maquinaria.
- **Traslados**: Registro y seguimiento de movimientos de equipos entre sedes.
- **Mantenimientos**: Programación y control de mantenimientos preventivos y correctivos.
- **Documentación**: Gestión de documentos asociados a equipos y activos.

## Requisitos

- PHP 8.2+
- Node.js 18+
- Composer
- Docker (opcional)

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd constructora-activos

# Instalar dependencias
composer install
npm install

# Configurar entorno
cp .env.example .env
php artisan key:generate

# Ejecutar migraciones
php artisan migrate

# Compilar assets
npm run build
```

## Desarrollo

```bash
# Iniciar servidor de desarrollo
php artisan serve
npm run dev
```

## Licencia

Este proyecto es software propietario.
