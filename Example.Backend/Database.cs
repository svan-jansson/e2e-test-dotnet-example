using MongoDB.Driver;

namespace Example.Backend
{
    class Database
    {
        private readonly MongoClient _client;
        private readonly IMongoDatabase _database;

        public Database(string databaseUrl)
        {
            _client = new MongoClient(databaseUrl);
            _database = _client.GetDatabase("measurements");
        }

        public IEnumerable<Measurement> GetMeasurements()
            => _database.GetCollection<Measurement>("data").AsQueryable().OrderByDescending(d => d.Time).Take(10);

        public void StoreMeasurement(Measurement measurement)
        {
            _database.GetCollection<Measurement>("data").InsertOne(measurement);
        }
    }
}