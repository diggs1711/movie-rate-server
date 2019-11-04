build-db:
	docker run -d --name movieRateContiner -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=YankeeHotelFoxtrot123' -p 1433:1433 mcr.microsoft.com/mssql/server
	npm run init-db
