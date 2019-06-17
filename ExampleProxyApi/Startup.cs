using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Newtonsoft.Json;

namespace ExampleProxyApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.Use(async (context, next) =>
            {
            	var pathAndQuery = context.Request.GetEncodedPathAndQuery();

            	const string apiEndpoint = "/api/weather/forecast";
            	if ( !pathAndQuery.StartsWith( apiEndpoint ) )
            		await next();
            	else
            	{
            		using ( var httpClient = new HttpClient() )
            		{
            			var response = await httpClient.GetAsync( "http://api.openweathermap.org/data/2.5/weather" + pathAndQuery.Replace( apiEndpoint, "" ) + "&appid=fcadd28326c90c3262054e0e6ca599cd" );
            			var result1 = await response.Content.ReadAsStringAsync();

            			var response1 = await httpClient.GetAsync( "http://api.openweathermap.org/data/2.5/forecast" + pathAndQuery.Replace( apiEndpoint, "" ) + "&appid=fcadd28326c90c3262054e0e6ca599cd" );
                        var result2 = await response1.Content.ReadAsStringAsync();

                        var combinedResult = "[" + result1 + "," + result2 + "]";


            			context.Response.StatusCode = (int)response.StatusCode;
            			await context.Response.WriteAsync( combinedResult );
            		}
            	}

            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
