FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build

COPY . /app
WORKDIR /app
RUN dotnet tool install --global dotnet-ef
RUN dotnet restore "./Server.csproj"
RUN dotnet build

RUN /root/.dotnet/tools/dotnet-ef migrations add InitialMigrations

RUN chmod +x ./entrypoint.sh
CMD /bin/bash ./entrypoint.sh
