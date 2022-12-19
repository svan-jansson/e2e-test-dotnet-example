using MongoDB.Bson.Serialization.Attributes;

namespace Example.Backend;

public class Measurement
{
    [BsonId]
    public Guid Id { get; set; }
    public long Time { get; set; }
    public double Temperature { get; set; }
}
