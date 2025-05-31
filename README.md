Para ejecutar el proyecto, sigue estos pasos:

1. En la raíz del proyecto, ejecuta:
   npm install

2. Luego, entra en la carpeta frontend y ejecuta:
   cd frontend
   npm install

3. Después, entra en la carpeta backend y ejecuta:
   cd ../backend
   npm install

4. Asegúrate de tener Laragon abierto (para que funcione la base de datos).

5. Navega a la carpeta prisma dentro del backend y ejecuta la migración:
   cd prisma
   npx prisma migrate dev

6. Finalmente, vuelve a la raíz del proyecto y ejecuta:
   cd ../../
   npm run start


   Y Bienvenido a DINOSDEVS!!