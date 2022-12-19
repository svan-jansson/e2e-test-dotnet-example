using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace Example.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MeasurementController : ControllerBase
{
    // https://api.open-meteo.com/v1/forecast?latitude=19.4727&longitude=-155.5921&timezone=Europe%2FBerlin&past_days=1&current_weather=true

    private readonly ILogger<MeasurementController> _logger;
    private readonly IConfiguration _configuration;

    public MeasurementController(ILogger<MeasurementController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<IEnumerable<Measurement>> Get()
    {
        var baseUri = _configuration.GetValue<Uri>("TemperatureSensorUrl");
        var url = new Uri(baseUri, "/v1/forecast?latitude=19.4727&longitude=-155.5921&timezone=Europe%2FBerlin&past_days=1&current_weather=true");

        _logger.LogInformation($"Calling remote: {url}");
        using var client = new HttpClient();
        var response = await client.GetAsync(url);
        var content = await response.Content.ReadAsStringAsync();

        var parsed = JsonSerializer.Deserialize<SensorResponse>(content);
        var measurement = new Measurement
        {
            Time = DateTimeOffset.Now.ToUnixTimeSeconds(),
            Temperature = parsed.CurrentWeather.Temperature
        };

        return new[] { measurement };
    }

    public record CurrentWeather(
        [property: JsonPropertyName("temperature")] double Temperature,
        [property: JsonPropertyName("windspeed")] double Windspeed,
        [property: JsonPropertyName("winddirection")] double Winddirection,
        [property: JsonPropertyName("weathercode")] int Weathercode,
        [property: JsonPropertyName("time")] string Time
    );

    public record SensorResponse(
        [property: JsonPropertyName("latitude")] double Latitude,
        [property: JsonPropertyName("longitude")] double Longitude,
        [property: JsonPropertyName("generationtime_ms")] double GenerationtimeMs,
        [property: JsonPropertyName("utc_offset_seconds")] int UtcOffsetSeconds,
        [property: JsonPropertyName("timezone")] string Timezone,
        [property: JsonPropertyName("timezone_abbreviation")] string TimezoneAbbreviation,
        [property: JsonPropertyName("elevation")] double Elevation,
        [property: JsonPropertyName("current_weather")] CurrentWeather CurrentWeather
    );

}
