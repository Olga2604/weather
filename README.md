Weather app built with Vue.js, .NET Core 2.2 and API from OpenWeatherMap provider.

IMPORTANT NOTE: in order to make this app work you must have API key and place it in the variable appid in the Startup.cs file where requests are sent to the data provider.

After downloading the project and unzipping it, please go to your terminal and follow these commands:

cd weatherApp/ExampleProxyApi
env
brew cask install dotnet-sdk
dotnet run
It must start a proxy server of my application. To run the frontend part please follow these commands:

cd ..
cd cool-weather-app/frontend
yarn install
yarn serve
