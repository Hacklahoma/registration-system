#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

# NPM
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install --yes nodejs
COPY ["clientapp/package.json", "clientapp/"]
COPY ["clientapp/package-lock.json", "clientapp/"]
WORKDIR /src/clientapp
RUN npm install

# Do not forget to change the current working directory to /src before copying all source code
WORKDIR /src

COPY ["RegistrationSystem.csproj", "."]
RUN dotnet restore "./RegistrationSystem.csproj"

COPY . .
WORKDIR "/src/."
RUN dotnet build "RegistrationSystem.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RegistrationSystem.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RegistrationSystem.dll"]

