using System.IO;
using Google.Cloud.Storage.V1;
using Google.Apis.Auth;

public class FirebaseStorageService
{
    private readonly string _bucketName = "arquitecturapoyecto.appspot.com"; // Reemplaza con tu bucket

    public StorageClient InitializeFirebase()
    {
        GoogleCredential credential;
        using (var stream = new FileStream("serviceAccountKey.json", FileMode.Open, FileAccess.Read))
        {
            credential = GoogleCredential.FromStream(stream)
                .CreateScoped(StorageClient.DefaultScopes);
        }

        return StorageClient.Create(credential);
    }
}
