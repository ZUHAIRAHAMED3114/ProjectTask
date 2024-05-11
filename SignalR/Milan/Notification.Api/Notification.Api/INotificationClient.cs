namespace Notification.Api
{
    public interface INotificationClient
    {
        Task RecieveNotification(string Message);
    }
}
