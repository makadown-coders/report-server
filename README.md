# Report Server
### Reportes con Nest.js

Proyecto que forma parte del [Excelente Curso](https://www.udemy.com/course/nestjs-reportes/) de Fernando Herrera.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

Tools used 

* [Visual Studio Code](https://code.visualstudio.com/)

* [Node](https://nodejs.org/en)

* [Docker Desktop](https://www.docker.com/get-started)

* [Nest CLI](https://docs.nestjs.com/first-steps)


```
npm i -g @nestjs/cli
npx prisma init
npm install @prisma/client
```
y una vez creada la base de datos con su info 
```
npx prisma db pull
```
y para generar el cliente (funcion helper que "sabrá" cómo luce la base de datos)
```
npx prisma generate
```


## Instrucciones para levantar el Backend

1. Clonar el repo
2. Instalar dependencias `npm install`
3. Clonar `env.template` y renombrarlo a `.env`
4. Completar las variables de entorno al archivo `.env`
5. Levantar base de datos `docker compose up -d`
6. Generar prisma client `npx prisma generate`
7. Ejecutar proyecto con `npm run start:dev`


# Opcional

* [Insomnia](https://insomnia.rest/)


Descargar imagen de PostgreSQL y PgAdmin
```
docker pull postgres:16.4
docker pull dpage/pgadmin4:8.11
```

## Hoja de Atajos
[Hojas de atajos de Nest y otros](https://cursos.devtalles.com/pages/mas-talento)


### Temas usados en VSCode:

* [Aura Theme](https://marketplace.visualstudio.com/items?itemName=DaltonMenezes.aura-theme)

* [Iconos](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)


Cambiar íconos de Angular por íconos de Nest -> Abrir: settings.json
```
"material-icon-theme.activeIconPack": "nest",
```

### Instalaciones adicionales

* [Paste JSON as Code](https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype)

* [.env](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)

* [Backticks](https://marketplace.visualstudio.com/items?itemName=fractalbrew.backticks)


## Otros Recursos:

[Recetas de Prisma](https://docs.nestjs.com/recipes/prisma)

[pdfMake](http://pdfmake.org/#/)

[estilo de letra Roboto](https://fonts.google.com/?query=roboto)